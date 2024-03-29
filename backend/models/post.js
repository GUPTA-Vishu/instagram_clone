
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
  Likes:[{type:ObjectId,ref:"USER"}],
  postedBy: {
    type: ObjectId,
    ref:"USER"
  }
});

// Create a User model from the schema
const Post = mongoose.model('POST', postSchema);

module.exports = Post;
