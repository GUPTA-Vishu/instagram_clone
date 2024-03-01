const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/signup", (req, res) => {
  const { name, userName, email, password } = req.body;
  if (!name || !email || !userName || !password) {
    return res.status(422).json({ error: "please add all fields required" });
  }
  USER.findOne({
    $or: [{ email: email }, { userName: userName }, { password: password }],
  }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({
          error: "Please add all required fields (userName and password).",
        });
    }
    bcrypt.hash(password, 12).then((hashedpassword) => {
      const user = new USER({
        name,
        email,
        userName,
        password: hashedpassword,
      });

      user
        .save()
        .then((user) => {
          res.json({ message: " Registered successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" });
  }

  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "User not found. Please sign up first" });
    }
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (result) {
        return res.status(200).json({ message: "Signed in successfully" });
      } else {
        return res.status(422).json({ error: "Invalid password" });
      }
    });
  }).catch(err => {
    console.error("Error while signing in:", err);
    res.status(500).json({ error: "Internal server error" });
  });
});






module.exports = router;
