const express = require("express");
const router = express.Router();
const User = require("../models/user");  // Assuming "user" model, not "book"

// Fetch user details by userId
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);  // Return user details in response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
