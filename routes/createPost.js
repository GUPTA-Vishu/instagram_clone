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
//for the like post 
router.put("/like", requireLogin, async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.user._id;
    
    console.log("Like request received. Post ID:", postId, "User ID:", userId);

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { Likes: userId } }, // Use $addToSet to ensure userId is added only once
      { new: true }
    );

    console.log("Post updated with like:", updatedPost);

    res.json(updatedPost);
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(422).json({ error: err.message });
  }
});


//for unlike post 
router.put("/unlike", requireLogin, async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.user._id;
    
    console.log("Unlike request received. Post ID:", postId, "User ID:", userId);

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { Likes: userId } }, // Use $pull to remove userId from likes array
      { new: true }
    );

    console.log("Post updated with unlike:", updatedPost);

    res.json(updatedPost);
  } catch (err) {
    console.error("Error unliking post:", err);
    res.status(422).json({ error: err.message });
  }
});

router.put("/comment", requireLogin, async (req, res) => {
  try {
    const comment = {
      comment: req.body.text,
      postedBy: req.user._id
    };

    const updatedPost = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment }
      },
      {
        new: true
      }
    )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name Photo");

    res.json(updatedPost);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});






module.exports = router;
