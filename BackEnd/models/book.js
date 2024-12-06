const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    booktitle: { type: String, required: true }, 
    bookauthor: { type: String, required: true }, 
    bookdesc: { type: String, required: true }, 
    img: { type: String },
    category: { type: String },
    publishedYear: { type: Number }, 
    ratings: { type: Number, min: 0, max: 5 }, 
  },
  { timestamps: true } 
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
