import React, { useState, useEffect } from "react";
import BookItem from "./BookItem";
import BookForm from "./BookForm";
import AddBookForm from "./AddBookForm";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetch("https://libbackend.hmmbo.com/api/books/admin")
      .then((response) => response.json())
      .then((data) => setBooks(data.books)) 
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleEditClick = (book) => {
    setEditingBook(book); 
  };

  const handleDelete = (bookId) => {
    fetch(`https://libbackend.hmmbo.com/api/books/delete/${bookId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId)); 
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  const handleFormSubmit = (formData) => {
    if (editingBook) {
      
      fetch(`https://libbackend.hmmbo.com/api/books/update/${editingBook._id}`, { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          
          setBooks((prevBooks) =>
            prevBooks.map((book) =>
              book._id === editingBook._id ? { ...book, ...formData } : book 
            )
          );
          setEditingBook(null); 
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
              key={book._id}  
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
