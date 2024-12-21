const express = require('express');
const Book = require('../models/book'); 

const router = express.Router();
router.get('/', async (req, res) => {
    const { page = 1, title, author, rating, publishedYear, category } = req.query;
    const limit = 10; // Number of books per page
    const skip = (page - 1) * limit;
  
    try {
      // Construct query with dynamic filters
      const query = {
        ...(title && {
          $or: [
            { booktitle: { $regex: title, $options: 'i' } }, // Search in title
            { bookdesc: { $regex: title, $options: 'i' } },  // Search in description
          ],
        }),
        ...(author && { bookauthor: { $regex: author, $options: 'i' } }), // Filter by author
        ...(rating && { ratings: { $gte: parseFloat(rating) } }), // Filter by minimum rating
        ...(publishedYear && { publishedYear: parseInt(publishedYear, 10) }), // Filter by exact year
        ...(category && { category: { $regex: category, $options: 'i' } }), // Filter by category
      };
  
      // Fetch filtered books with pagination
      const books = await Book.find(query).skip(skip).limit(limit);
  
      res.json({ books, page: parseInt(page, 10), limit });
    } catch (err) {
      res.status(500).json({ error: 'Error fetching books' });
    }
  });

  router.get('/admin', async (req, res) => {
    const { title, author, rating, publishedYear, category } = req.query;
  
    try {
      // Construct query with dynamic filters
      const query = {
        ...(title && {
          $or: [
            { booktitle: { $regex: title, $options: 'i' } }, // Search in title
            { bookdesc: { $regex: title, $options: 'i' } },  // Search in description
          ],
        }),
        ...(author && { bookauthor: { $regex: author, $options: 'i' } }), // Filter by author
        ...(rating && { ratings: { $gte: parseFloat(rating) } }), // Filter by minimum rating
        ...(publishedYear && { publishedYear: parseInt(publishedYear, 10) }), // Filter by exact year
        ...(category && { category: { $regex: category, $options: 'i' } }), // Filter by category
      };
  
      // Fetch all books that match the query (no pagination)
      const books = await Book.find(query);
  
      res.json({ books });
    } catch (err) {
      res.status(500).json({ error: 'Error fetching books' });
    }
  });

    router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;

  try {
    // Find the book by ID and update it with the new data
    const book = await Book.findByIdAndUpdate(id, updatedBook, {
      new: true, // Return the updated book
      runValidators: true, // Validate the data before updating
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book updated successfully!", book });
  } catch (err) {
    res.status(500).json({ error: "Error updating book", message: err.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the book by ID
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting book", message: err.message });
  }
});

  module.exports = router;
  