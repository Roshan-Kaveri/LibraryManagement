const express = require('express');
const Book = require('../models/book'); 

const router = express.Router();

router.post("/create", async (req, res) => {
        try {
            console.log("Ho")
          const newBook = new Book(req.body); 
          await newBook.save(); 
          res.status(201).json({ message: "Book added successfully", book: newBook });
        } catch (error) {
          console.error("Error adding book:", error);
          res.status(500).json({ message: "Failed to add book", error: error.message });
        }
    
  });

  module.exports = router;
  