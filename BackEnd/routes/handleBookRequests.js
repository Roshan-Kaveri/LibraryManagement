const express = require('express');
const router = express.Router();
const Book = require('../models/book'); 
const RentRequest = require('../models/requests'); 

router.post('/books', async (req, res) => {
  try {
    const { bookId } = req.body; 

    if (!bookId) {
      return res.status(400).json({ error: 'Book ID is required' });
    }

    const book = await Book.findById(bookId); 
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch book details' });
  }
});


router.post('/requests/rent', async (req, res) => {
  try {
    console.log( req.body)
    const { userId, bookId, bookTitle } = req.body; 
    if (!userId || !bookId) {
      return res.status(400).json({ error: 'User ID and Book ID are required' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const newRequest = new RentRequest({
      userId,
      bookId,
      bookTitle: bookTitle || book.title,
      status: 'Requested',
    });

    await newRequest.save();
    res.status(201).json({ message: 'Rent request submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit rent request' });
  }
});

router.post("/requests/status", async (req, res) => {
  const { userId, bookId } = req.body;

  
  if (!userId || !bookId) {
    return res.status(400).json({ error: "Missing userId or bookId" });
  }

  try {
    
    const rentRequest = await RentRequest.findOne({ userId, bookId });

    if (!rentRequest) {
      return res.status(404).json({ status: "No request found" });
    }

    
    res.json({ status: rentRequest.status });
  } catch (error) {
    console.error("Error fetching request status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
