const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true
  },
  userName: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
    required: true
  }
});

// Create a User model from the schema
const User = mongoose.model('USER', userSchema);

module.exports = User;
