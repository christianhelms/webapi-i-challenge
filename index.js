// Libraries
const express = require("express");

// Files
const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("First backend project");
});

// read
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "error getting a list of users, sorry fam." });
    });
});

// read by id
server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  Users.findById(userId)
    .then(userId => {
      res.status(200).json(userId);
    })
    .catch(error => {
      res.status(500).json({ message: "error finding that user, sorry fam." });
    });
});

// create
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  console.log("user info from body", userInfo);
  Users.insert(userInfo)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json({ message: "error adding to hubs" });
    });
});
// delete
server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  Users.remove(userId)
    .then(hub => {
      res.status(200).json({ message: "User deleted successfully!" });
    })
    .catch(error => {
      res.status(500).json({ message: "error adding to hubs" });
    });
});

// update
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating hub" });
    });
});

const port = 8000;
server.listen(port, () => console.log("/napi running/n"));
