const express = require("express");
const Fine = require('../models/fine');
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

// Route to pay fines
router.post('/pay-fine', async (req, res) => {
  const { fineId } = req.body; // Fine ID to mark as paid

  try {
    const fine = await Fine.findById(fineId);
    if (!fine) {
      return res.status(404).json({ error: 'Fine not found' });
    }

    fine.isPaid = true; // Mark the fine as paid
    await fine.save();

    res.json({ message: 'Fine paid successfully' });
  } catch (err) {
    console.error('Error updating fine status:', err.message);
    res.status(500).json({ error: 'Error updating fine status' });
  }
});

module.exports = router;
