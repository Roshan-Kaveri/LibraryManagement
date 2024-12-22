import React, { useState } from "react";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    booktitle: "",
    bookauthor: "",
    bookdesc: "",
    img: "",
    category: "",
    publishedYear: "",
    ratings: "",
  });

  const [formVisible, setFormVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://libbackend.hmmbo.com/api/books/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response data if needed
      alert("Book saved successfully!");
      setFormData({
        booktitle: "",
        bookauthor: "",
        bookdesc: "",
        img: "",
        category: "",
        publishedYear: "",
        ratings: "",
      });
    } catch (error) {
      console.error("Error saving book:", error.message);
      alert("Failed to save book. Please try again.");
    }
  };

  return (
    <div className="mx-auto p-8 pb-0">
            <h1 className="text-3xl font-bold mb-6">Manage Books</h1>

      <button
        onClick={() => setFormVisible(!formVisible)}
        className="bg-white text-greenish px-4 py-2 rounded shadow border border-1 border-greenish  hover:bg-green-800 hover:text-white transition"
      >
        {formVisible ? "Close Form" : "+ Add Books"}
      </button>

      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 mt-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              name="booktitle"
              value={formData.booktitle}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Author:
            </label>
            <input
              type="text"
              name="bookauthor"
              value={formData.bookauthor}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description:
            </label>
            <textarea
              name="bookdesc"
              value={formData.bookdesc}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Image URL:
            </label>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Category:
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Published Year:
            </label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Ratings (0-5):
            </label>
            <input
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleInputChange}
              min="0"
              max="5"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
          >
            Save Book
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBookForm;
