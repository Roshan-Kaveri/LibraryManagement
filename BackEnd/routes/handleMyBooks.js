const express = require("express");
const RentRequest = require('../models/requests');
const Book = require('../models/book');

const router = express.Router();

router.post('/my-books', async (req, res) => {
    const { userId } = req.body; // Get the userId from the body of the request
    
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    console.log('Fetching books for User ID:', userId);

    try {
        // Fetch rent requests
        const rentRequests = await RentRequest.find({ 
            userId, 
            status: { $in: ['Approved','Late', 'Waiting to be Collected', 'Collected'] }
        });

        const bookIds = rentRequests.map(request => request.bookId);
        const books = await Book.find({ _id: { $in: bookIds } });
        res.json({ books });
    } catch (err) {
        console.error('Error while fetching user books:', err.message);
        res.status(500).json({ error: 'Error fetching user books' });
    }
});

module.exports = router;
