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

    // Set token with error handling for Redis
    try {
      await setToken(username);
    } catch (redisError) {
      console.error("Redis is down or unreachable:", redisError);
      req.response.message =
        "Login successful, but session could not be established. Please try again later.";
    }
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.logoutGCUserServ = async (req) => {
  try {
    // Logic for logout can be handled here
    try {
      await deleteToken(req.body.username);
      req.response.message = "Logout successful";
    } catch (redisError) {
      console.error("Redis is down or unreachable:", redisError);
      req.response.message =
        "Logout successful, but session may still be active.";
    }
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.isLoggedInServ = async (req) => {
  try {
    // Check if the user is logged in
    let isLoggedIn = false;
    try {
      const data = await getToken(req.body.username);
      isLoggedIn = data == 1; // Assuming that a value of 1 indicates a logged-in state
    } catch (redisError) {
      console.error("Redis is down or unreachable:", redisError);
      req.response.message =
        "Could not verify login status. Please try again later.";
    }

    req.response.data = { isLoggedIn };
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
//----------------------------ENSURE REDIS IS CONNECTED LOCALLY----------------------------------------------
//----------COMMAND TO START REDIS = redis-server.exe

const redis = require("redis");

// Create a Redis client
const redisClient = redis.createClient({
  url: "redis://localhost:6379/0",
  socket: {
    reconnectStrategy: (retries) => {
      if (retries >= 5) {
        console.error("Too many reconnection attempts. Exiting.");
        return new Error("Too many reconnection attempts");
      }
      console.log(`Reconnecting to Redis... Attempt: ${retries + 1}`);
      return Math.min(retries * 100, 3000); // Delay in milliseconds
    },
  },
});

// Event listeners for connection errors and readiness
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("ready", () => console.log("Redis client connected"));
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});
redisClient.on("end", () => {
  console.log("Disconnected from Redis");
});
redisClient.on("reconnecting", () => {
  console.log("Reconnecting to Redis");
});

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
