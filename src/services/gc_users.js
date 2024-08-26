const {
  getGCUser,
  createGCUser,
  updateGCUser,
} = require("../repositories/mysql/gc_users");

const argon2 = require("argon2");

module.exports.createGCUserServ = async (req) => {
  try {
    const { username, password, email, name, contact_number } = req.body;

    // Basic validation
    if (!username || !password || !name) {
      throw new Error("Name , Username and password are required");
    }

    // Check if user already exists
    const existingUser = await getGCUser({ username: username });
    if (existingUser.length) {
      throw new Error("Username already exists");
    }

    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Create the user
    const newUser = await createGCUser({
      username,
      password: hashedPassword, // Save the hashed password
      email, // New field
      name, // New field
      contact_number, // New field
    });

    req.response.data = newUser;
    req.response.message = "User created successfully";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.editGCUserServ = async (req) => {
  try {
    const { username, password, id, email, name, contact_number } = req.body;

    // Basic validation
    if (!id) {
      throw new Error("ID is required");
    }

    // Check if user exists
    const user = await getGCUser({ id: id });
    if (!user.length) {
      throw new Error("User not found");
    }

    // Prepare update data
    let updateData = {};
    if (username) updateData.username = username;
    if (password) updateData.password = await argon2.hash(password);
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (contact_number) updateData.contact_number = contact_number;

    // Update user
    const updatedUser = await updateGCUser(updateData, { id: id });

    req.response.data = updatedUser;
    req.response.message = "User updated successfully";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.loginGCUserServ = async (req) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    // Find the user by username
    const user = await getGCUser({ username: username });
    if (!user.length) {
      throw new Error("User not found");
    }

    // Compare the provided password with the stored hashed password using Argon2
    const isMatch = await argon2.verify(user[0].dataValues.password, password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    // Successful login
    req.response.message = "Login successful";
    // Set token
    await setToken(username);
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.logoutGCUserServ = async (req) => {
  try {
    // Logic for logout can be handled here
    const result = await deleteToken(req.body.username);
    req.response.message = "Logout successful";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.isLoggedInServ = async (req) => {
  try {
    // Logic for logout can be handled here
    const data = await getToken(req.body.username);
    req.response.data = { isLoggedIn: true ? data == 1 : false };
    // req.response.message = "Logout successful";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.getAllGCUsersServ = async (req) => {
  try {
    const users = await getGCUser(req.body);

    req.response.data = users;
    req.response.message = "Users retrieved successfully";
  } catch (error) {
    req.response.data = 0;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

//---------------------------------------------------REDIS FUNCTIONS------------------------------------------

const redis = require("redis");

// Create a Redis client
const redisClient = redis.createClient({
  url: "redis://localhost:6379/0",
});

// Event listeners for connection errors and readiness
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("ready", () => console.log("Redis client connected"));

// Connect to the Redis server
async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

// Function to set data in Redis
async function setToken(tokenKey) {
  await connectRedis();
  await redisClient.set(tokenKey, "1");
}

// Function to get data from Redis
async function getToken(tokenKey) {
  await connectRedis();
  const data = await redisClient.get(tokenKey);
  return JSON.parse(data);
}

// Function to delete a key from Redis
async function deleteToken(tokenKey) {
  await connectRedis();
  const result = await redisClient.del(tokenKey);
  return result;
}
