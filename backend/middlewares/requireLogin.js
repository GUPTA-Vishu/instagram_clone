const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must have logged IN" });
  }
  // Extract token from Authorization header
  const token = authorization.replace("Bearer ", "");
  // Verify token
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    const { _id } = payload;
    // Find user by ID
    USER.findById(_id).then((userData) => {
      req.user = userData; // Attach user data to request object
      next();
    });
  });
};
