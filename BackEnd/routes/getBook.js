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

  module.exports = router;
  