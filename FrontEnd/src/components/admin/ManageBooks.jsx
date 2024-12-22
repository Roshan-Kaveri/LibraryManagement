import React, { useState, useEffect } from "react";
import BookItem from "./BookItem";
import BookForm from "./BookForm";
import AddBookForm from "./AddBookForm";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  // Fetch books from the backend when the component mounts
  useEffect(() => {
    fetch("https://libbackend.hmmbo.com/api/books/admin")
      .then((response) => response.json())
      .then((data) => setBooks(data.books))  // Make sure you're accessing 'books' from the response
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleEditClick = (book) => {
    setEditingBook(book); // Set the book for editing
  };

  const handleDelete = (bookId) => {
    // Send DELETE request to backend to delete the book
    fetch(`https://libbackend.hmmbo.com/api/books/delete/${bookId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the deleted book from the state
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId)); // Use _id for comparison
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  const handleFormSubmit = (formData) => {
    if (editingBook) {
      // Send PUT request to backend to update the book
      fetch(`https://libbackend.hmmbo.com/api/books/update/${editingBook._id}`, { // Use _id here as well
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          // Update the books state with the new book data
          setBooks((prevBooks) =>
            prevBooks.map((book) =>
              book._id === editingBook._id ? { ...book, ...formData } : book // Use _id here as well
            )
          );
          setEditingBook(null); // Close the form
        })
        .catch((error) => console.error("Error updating book:", error));
    }
  };

  return (
    <div className="mx-auto p-8 pt-0">
        <div className="flex">
        <h2 className="text-xl font-bold mb-6"></h2>
        </div>
      {editingBook ? (
        <BookForm book={editingBook} onSubmit={handleFormSubmit} />
      ) : (
        <ul className="bg-white ">
          {books.map((book) => (
            <BookItem
              key={book._id}  // Use _id here for the key
              book={book}
              onEdit={handleEditClick}
              onDelete={() => handleDelete(book._id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageBooks;
