const express = require("express");
const router = express.Router();
const Post = require("../models/post"); // Assuming your Post model is in a file named Post.js
const requireLogin = require("../middlewares/requireLogin"); // Assuming your requireLogin middleware is in a file named requireLogin.js

// Route to handle POST requests to create a new post
router.post("/createPost", requireLogin, async (req, res) => {
  const { title, body } = req.body;

  try {
    // Check if title and body are provided
    if (!title || !body) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    // Create a new post object
    const newPost = new Post({
      title,
      body,
      postedBy: req.user._id // Use the ObjectId of the logged-in user
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    res.json(savedPost); // Return the saved post
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
