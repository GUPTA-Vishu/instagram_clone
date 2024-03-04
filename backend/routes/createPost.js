const express = require("express");
const router = express.Router();
const Post = require("../models/post"); // Assuming your Post model is in a file named Post.js
const requireLogin = require("../middlewares/requireLogin"); // Assuming your requireLogin middleware is in a file named requireLogin.js

// Route to handle POST requests to create a new post
router.post("/createPost", requireLogin, async (req, res) => {
  const { body,pic } = req.body;

  try {
    // Check if title and body are provided
    if (!body|| !pic) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    // Create a new post object
    const newPost = new Post({
      
      body,
      photo: pic,
      postedBy: req.user._id // Use the ObjectId of the logged-in user
    });

    // Save the post to the database
    const savedPost = await newPost.save();
    console.log(savedPost);

    res.json(savedPost); // Return the saved post
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
