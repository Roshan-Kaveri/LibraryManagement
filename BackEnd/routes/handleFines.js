const express = require("express");
const Fine = require('../models/fine');
const User = require('../models/user');
const router = express.Router();

// Route to get unpaid fines
router.post('/unpaid-fines', async (req, res) => {
    const { userId } = req.body;
    console.log(userId, "PP")
    try {
      const unpaidFines = await Fine.find({ userId, isPaid: false });
      console.log(unpaidFines)
      res.json({ fines: unpaidFines });
    } catch (err) {
      console.error('Error fetching unpaid fines:', err.message);
      res.status(500).json({ error: 'Error fetching unpaid fines' });
    }
  });



// Route to get all users with their total fines
const mongoose = require('mongoose');

router.get("/users/total-fines", async (req, res) => {
  try {
    // Aggregate fines and calculate total fine for each user, filtering only unpaid fines (isPaid: false)
    const usersFines = await Fine.aggregate([
      {
        $match: {
          isPaid: false, // Only consider unpaid fines
        },
      },
      {
        $group: {
          _id: "$userId", // Group by userId
          totalFine: { $sum: "$amount" }, // Sum up the fines for each user
        },
      },
      {
        $addFields: {
          userId: { $toObjectId: "$_id" }, // Convert userId string to ObjectId
        },
      },
      {
        $lookup: {
          from: "users", // Join with the "users" collection
          localField: "userId", // userId from Fine collection
          foreignField: "_id", // _id from User collection
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Unwind to get individual user details
      },
      {
        $project: {
          userId: "$userDetails._id", // Get userId
          username: "$userDetails.name", // Get user's name
          totalFine: 1, // Add totalFine to result
        },
      },
    ]);

    res.status(200).json(usersFines);
  } catch (error) {
    console.error("Error fetching fines:", error);
    res.status(500).json({ message: "Error fetching fines" });
  }
});



// Route to mark all fines as paid for a user
router.post("/fines/mark-paid", async (req, res) => {
  const { userId } = req.body;

  try {
    // Update all fines for the specified userId to be marked as paid
    await Fine.updateMany({ userId, isPaid: false }, { $set: { isPaid: true } });

    res.status(200).json({ message: "Fines marked as paid" });
  } catch (error) {
    console.error("Error marking fines as paid:", error);
    res.status(500).json({ message: "Error marking fines as paid" });
  }
});






module.exports = router;