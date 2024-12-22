const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); 
const bcrypt = require("bcrypt");

const router = express.Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.passwordHash) {
      return res.status(400).json({ message: "Try logging in in diffrent method" });
    }



    
    console.log("Password from request:", password);
    console.log("Password Hash from database:", user.passwordHash);

    
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "10h",
    });

    
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
