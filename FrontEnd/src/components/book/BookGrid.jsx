import React from "react";
import BookCard from "../home/Card"; // Assuming BookCard is the card component for individual books

const BookGrid = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {books.map((book) => (
        <BookCard
          key={book?._id}
          booktitle={book.booktitle}
          bookauthor={book.bookauthor}
          bookdesc={book.bookdesc}
          img={book.img}
          bookid={book?._id}
          ratings={book?.ratings}
        />
      ))}
    </div>
  );
};

export default BookGrid;
