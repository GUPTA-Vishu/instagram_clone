
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// Define the User schema
const postSchema = new mongoose.Schema({
  
  body: {
    type: String,
    required: true,
    // unique: true
  },
  photo: {
    type: String,
    required: true
    
  },
  postedBy: {
    type: ObjectId,
    ref:"User"
  }
});

// Create a User model from the schema
const Post = mongoose.model('POST', postSchema);

module.exports = Post;
