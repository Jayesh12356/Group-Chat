const express = require("express");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

const app = express();
const port = process.env.PORT || 4203;

before((done) => {
  app.use(express.json()); // To parse JSON bodies

  // Sample route for adding a group member
  app.post("/addGCGroupMember", (req, res) => {
    res
      .status(200)
      .send({ message: "POST request successful", data: req.body });
  });

  // Sample route for removing a group member
  app.post("/removeGCGroupMember", (req, res) => {
    res
      .status(200)
      .send({ message: "POST request successful", data: req.body });
  });

  // Sample route for retrieving group members
  app.post("/getGCGroupMember", (req, res) => {
    res
      .status(200)
      .send({ message: "POST request successful", data: req.body });
  });

  // Sample route for updating group role
  app.post("/updateGCGroupRole", (req, res) => {
    res
      .status(200)
      .send({ message: "POST request successful", data: req.body });
  });

  // Sample route for creating a group
  app.post("/createGCGroup", (req, res) => {
    res.status(200).send({
      message: "Group created successfully and creator assigned as admin",
      data: req.body,
    });
  });

  // Sample route for editing a group
  app.post("/editGCGroup", (req, res) => {
    res
      .status(200)
      .send({ message: "Group updated successfully", data: req.body });
  });

  // Sample route for deleting a group
  app.post("/deleteGCGroup", (req, res) => {
    res
      .status(200)
      .send({ message: "Group deleted successfully", data: req.body });
  });

  // Sample route for searching groups
  app.post("/searchGCGroup", (req, res) => {
    res
      .status(200)
      .send({ message: "Groups retrieved successfully", data: req.body });
  });

  // Sample route for reacting to a message
  app.post("/reactToMessage", (req, res) => {
    res
      .status(200)
      .send({ message: "Reaction added successfully", data: req.body });
  });

  // Sample route for retrieving group messages
  app.post("/getGCGroupMessages", (req, res) => {
    res
      .status(200)
      .send({ message: "Messages retrieved successfully", data: req.body });
  });

  // Sample route for sending a group message
  app.post("/sendGCMessage", (req, res) => {
    res
      .status(200)
      .send({ message: "Message sent successfully", data: req.body });
  });

  // Sample route for retrieving message reactions
  app.post("/getGCMessageReactions", (req, res) => {
    res
      .status(200)
      .send({ message: "Reactions retrieved successfully", data: req.body });
  });

  // Sample route for deleting a message
  app.post("/deleteGCMessage", (req, res) => {
    res
      .status(200)
      .send({ message: "Message deleted successfully", data: req.body });
  });

  // Sample route for editing a message
  app.post("/editGCMessage", (req, res) => {
    res
      .status(200)
      .send({ message: "Message updated successfully", data: req.body });
  });

  // Sample route for creating a new user
  app.post("/createGCUser", (req, res) => {
    res
      .status(200)
      .send({ message: "User created successfully", data: req.body });
  });

  // Sample route for editing a user's details
  app.post("/editGCUser", (req, res) => {
    res
      .status(200)
      .send({ message: "User updated successfully", data: req.body });
  });

  // Sample route for user login
  app.post("/loginGCUser", (req, res) => {
    res.status(200).send({ message: "Login successful", data: req.body });
  });

  // Sample route for user logout
  app.post("/logoutGCUser", (req, res) => {
    res.status(200).send({ message: "Logout successful", data: req.body });
  });

  // Sample route for retrieving all users
  app.post("/getAllGCUsers", (req, res) => {
    res
      .status(200)
      .send({ message: "Users retrieved successfully", data: req.body });
  });

  // Sample route for checking if user is logged in
  app.post("/isLoggedIn", (req, res) => {
    res.status(200).send({ message: "User is logged in", data: req.body });
  });

  // Start the server
  global.testServer = app.listen(port, () => {
    console.log(`Running on port ${port}`);
    done();
  });

  global.testServer.timeout = 60000; // Set timeout if necessary
});

describe("API Tests", () => {
  it("should POST /addGCGroupMember", (done) => {
    chai
      .request(global.testServer)
      .post("/addGCGroupMember")
      .send({
        group_id: 15,
        user_id: 1,
        requester_id: 4,
        role: "admin",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("POST request successful");
        res.body.should.have.property("data").eql({
          group_id: 15,
          user_id: 1,
          requester_id: 4,
          role: "admin",
        });
        done();
      });
  });

  it("should POST /removeGCGroupMember", (done) => {
    chai
      .request(global.testServer)
      .post("/removeGCGroupMember")
      .send({
        group_id: 15,
        user_id: 1,
        requester_id: 4,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("POST request successful");
        res.body.should.have.property("data").eql({
          group_id: 15,
          user_id: 1,
          requester_id: 4,
        });
        done();
      });
  });

  it("should POST /getGCGroupMember", (done) => {
    chai
      .request(global.testServer)
      .post("/getGCGroupMember")
      .send({
        group_id: 15,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("POST request successful");
        res.body.should.have.property("data").eql({
          group_id: 15,
        });
        done();
      });
  });

  it("should POST /updateGCGroupRole", (done) => {
    chai
      .request(global.testServer)
      .post("/updateGCGroupRole")
      .send({
        group_id: 15,
        user_id: 2,
        new_role: "member",
        requester_id: 4,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("POST request successful");
        res.body.should.have.property("data").eql({
          group_id: 15,
          user_id: 2,
          new_role: "member",
          requester_id: 4,
        });
        done();
      });
  });

  it("should POST /createGCGroup", (done) => {
    chai
      .request(global.testServer)
      .post("/createGCGroup")
      .send({
        name: "New Group",
        created_by: 1,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Group created successfully and creator assigned as admin");
        res.body.should.have.property("data").that.is.an("object");
        done();
      });
  });

  it("should POST /editGCGroup", (done) => {
    chai
      .request(global.testServer)
      .post("/editGCGroup")
      .send({
        id: 1,
        name: "Updated Group Name",
        is_deleted: false,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Group updated successfully");
        res.body.should.have.property("data").that.is.an("object");
        done();
      });
  });

  it("should POST /deleteGCGroup", (done) => {
    chai
      .request(global.testServer)
      .post("/deleteGCGroup")
      .send({
        id: 1,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Group deleted successfully");
        res.body.should.have.property("data").that.is.an("object");
        done();
      });
  });

  it("should POST /deleteGCGroup", (done) => {
    chai
      .request(global.testServer)
      .post("/deleteGCGroup")
      .send({
        id: 1,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Group deleted successfully");
        res.body.should.have.property("data").that.is.an("object");
        done();
      });
  });

  it("should POST /reactToMessage", (done) => {
    chai
      .request(global.testServer)
      .post("/reactToMessage")
      .send({
        message_id: 1,
        user_id: 2,
        reaction_type: "like",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Reaction added successfully");
        res.body.should.have.property("data").eql({
          message_id: 1,
          user_id: 2,
          reaction_type: "like",
        });
        done();
      });
  });

  it("should POST /getGCGroupMessages", (done) => {
    chai
      .request(global.testServer)
      .post("/getGCGroupMessages")
      .send({
        group_id: 1,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Messages retrieved successfully");
        res.body.should.have.property("data").eql({
          group_id: 1,
        });
        done();
      });
  });

  it("should POST /sendGCMessage", (done) => {
    chai
      .request(global.testServer)
      .post("/sendGCMessage")
      .send({
        group_id: 1,
        user_id: 2,
        message: "Hello Group",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Message sent successfully");
        res.body.should.have.property("data").eql({
          group_id: 1,
          user_id: 2,
          message: "Hello Group",
        });
        done();
      });
  });

  it("should POST /getGCMessageReactions", (done) => {
    chai
      .request(global.testServer)
      .post("/getGCMessageReactions")
      .send({
        message_id: 1,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Reactions retrieved successfully");
        res.body.should.have.property("data").eql({
          message_id: 1,
        });
        done();
      });
  });

  it("should POST /deleteGCMessage", (done) => {
    chai
      .request(global.testServer)
      .post("/deleteGCMessage")
      .send({
        message_id: 1,
        user_id: 2,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Message deleted successfully");
        res.body.should.have.property("data").eql({
          message_id: 1,
          user_id: 2,
        });
        done();
      });
  });

  it("should POST /editGCMessage", (done) => {
    chai
      .request(global.testServer)
      .post("/editGCMessage")
      .send({
        message_id: 1,
        user_id: 2,
        message: "Edited Message",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Message updated successfully");
        res.body.should.have.property("data").eql({
          message_id: 1,
          user_id: 2,
          message: "Edited Message",
        });
        done();
      });
  });

  it("should POST /createGCUser", (done) => {
    chai
      .request(global.testServer)
      .post("/createGCUser")
      .send({
        username: "testuser",
        password: "password123",
        email: "testuser@example.com",
        name: "Test User",
        contact_number: "1234567890",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("User created successfully");
        res.body.should.have.property("data").eql({
          username: "testuser",
          password: "password123",
          email: "testuser@example.com",
          name: "Test User",
          contact_number: "1234567890",
        });
        done();
      });
  });

  it("should POST /editGCUser", (done) => {
    chai
      .request(global.testServer)
      .post("/editGCUser")
      .send({
        id: 1,
        username: "newusername",
        email: "newemail@example.com",
        name: "New Name",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("User updated successfully");
        res.body.should.have.property("data").eql({
          id: 1,
          username: "newusername",
          email: "newemail@example.com",
          name: "New Name",
        });
        done();
      });
  });

  it("should POST /loginGCUser", (done) => {
    chai
      .request(global.testServer)
      .post("/loginGCUser")
      .send({
        username: "testuser",
        password: "password123",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Login successful");
        res.body.should.have.property("data").eql({
          username: "testuser",
          password: "password123",
        });
        done();
      });
  });

  it("should POST /logoutGCUser", (done) => {
    chai
      .request(global.testServer)
      .post("/logoutGCUser")
      .send({
        username: "testuser",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Logout successful");
        res.body.should.have.property("data").eql({
          username: "testuser",
        });
        done();
      });
  });

  it("should POST /getAllGCUsers", (done) => {
    chai
      .request(global.testServer)
      .post("/getAllGCUsers")
      .send({})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Users retrieved successfully");
        res.body.should.have.property("data").eql({});
        done();
      });
  });

  it("should POST /isLoggedIn", (done) => {
    chai
      .request(global.testServer)
      .post("/isLoggedIn")
      .send({
        username: "testuser",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("User is logged in");
        res.body.should.have.property("data").eql({
          username: "testuser",
        });
        done();
      });
  });
});

after((done) => {
  global.testServer.close(() => {
    console.log("Http server closed.");
    done();
  });
});
