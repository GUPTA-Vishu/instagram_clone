const express = require("express");
const router = express.Router();

const Post = require("../models/post"); // Assuming your Post model is in a file named Post.js

const requireLogin = require("../middlewares/requireLogin");
router.use(express.json());
// Assuming your requireLogin middleware is in a file named requireLogin.js

// Route to handle POST requests to create a new post


router.get("/allposts",(req,res)=>{
  Post.find()
  .populate("postedBy", "_id name")
  .then(posts=>res.json(posts))
  .catch(err=>console.log(err))
});



router.post("/createPost", requireLogin, async (req, res) => {
  const { caption, pic } = req.body;
  console.log(pic);
  console.log(caption);

  if (!caption|| !pic) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  console.log(req.user);
  const post = new Post({
    body:caption,
    photo: pic,
    postedBy: req.user._id,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/myposts",requireLogin, async (req, res) => {
  Post.find({postedBy: req.user._id})
  .populate("postedBy", "_id name ")
  .then(myposts => res.json(myposts))

   
})


module.exports = router;
