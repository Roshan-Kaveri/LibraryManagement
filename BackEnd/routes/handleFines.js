const express = require("express");
const Fine = require('../models/fine');
const User = require('../models/user');
const router = express.Router();


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




const mongoose = require('mongoose');

router.get("/users/total-fines", async (req, res) => {
  try {
    
    const usersFines = await Fine.aggregate([
      {
        $match: {
          isPaid: false, 
        },
      },
      {
        $group: {
          _id: "$userId", 
          totalFine: { $sum: "$amount" }, 
        },
      },
      {
        $addFields: {
          userId: { $toObjectId: "$_id" }, 
        },
      },
      {
        $lookup: {
          from: "users", 
          localField: "userId", 
          foreignField: "_id", 
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", 
      },
      {
        $project: {
          userId: "$userDetails._id", 
          username: "$userDetails.name", 
          totalFine: 1, 
        },
      },
    ]);

    res.status(200).json(usersFines);
  } catch (error) {
    console.error("Error fetching fines:", error);
    res.status(500).json({ message: "Error fetching fines" });
  }
});




router.post("/fines/mark-paid", async (req, res) => {
  const { userId } = req.body;

  try {
    
    await Fine.updateMany({ userId, isPaid: false }, { $set: { isPaid: true } });

    res.status(200).json({ message: "Fines marked as paid" });
  } catch (error) {
    console.error("Error marking fines as paid:", error);
    res.status(500).json({ message: "Error marking fines as paid" });
  }
});






module.exports = router;