const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("USER");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Check if Authorization header is present
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }

  // Extract token from Authorization header
  const token = authorization.replace("Bearer ", "");

  try {
    // Verify token
    const payload = jwt.verify(token, JWT_SECRET);

    // Find user by ID in the database
    User.findById(payload._id).then((userData) => {
      if (!userData) {
        return res.status(401).json({ error: "User not found" });
      }

      // Attach user data to request object
      req.user = userData;
      next();
    });
  } catch (err) {
    // Handle token verification errors
    return res.status(401).json({ error: "Invalid token" });
  }
};
