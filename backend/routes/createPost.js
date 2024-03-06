const express = require("express");
const router = express.Router();

const Post = require("../models/post"); // Assuming your Post model is in a file named Post.js

const requireLogin = require("../middlewares/requireLogin");
router.use(express.json());
// Assuming your requireLogin middleware is in a file named requireLogin.js

// Route to handle POST requests to create a new post
router.post("/createPost", requireLogin, async (req, res) => {
  const { body, pic } = req.body;
  console.log(pic);
  console.log(body);

  if (!body || !pic) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  console.log(req.user);
  const post = new Post({
    body: body,
    photo: pic,
    postedBy: req.user,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
