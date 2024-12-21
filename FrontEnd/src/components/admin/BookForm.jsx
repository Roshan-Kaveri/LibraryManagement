import React, { useState, useEffect } from "react";

const BookForm = ({ book, onSubmit }) => {
  const [formData, setFormData] = useState({
    booktitle: book ? book.booktitle : "",
    bookauthor: book ? book.bookauthor : "",
    bookdesc: book ? book.bookdesc : "",
    img: book ? book.img : "",
    category: book ? book.category : "",
    publishedYear: book ? book.publishedYear : "",
    ratings: book ? book.ratings : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to the parent
  };

  useEffect(() => {
    if (book) {
      setFormData({
        booktitle: book.booktitle,
        bookauthor: book.bookauthor,
        bookdesc: book.bookdesc,
        img: book.img,
        category: book.category,
        publishedYear: book.publishedYear,
        ratings: book.ratings,
      });
    }
  }, [book]);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h3 className="text-lg font-bold mb-4">{book ? "Edit" : "Add"} Book</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title:</label>
        <input
          type="text"
          name="booktitle"
          value={formData.booktitle}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Author:</label>
        <input
          type="text"
          name="bookauthor"
          value={formData.bookauthor}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description:</label>
        <textarea
          name="bookdesc"
          value={formData.bookdesc}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Image URL:</label>
        <input
          type="text"
          name="img"
          value={formData.img}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
      >
        Save Changes
      </button>
    </form>
  );
};

export default BookForm;
