const express = require("express");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken package for creating JWT tokens
const User = require("../models/user"); // Import the User model
const bcrypt = require("bcrypt");

const router = express.Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Log the password and hash to check if both exist and are valid
    console.log("Password from request:", password);
    console.log("Password Hash from database:", user.passwordHash);

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Respond with the token
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
