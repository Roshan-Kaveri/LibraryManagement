import React from "react";

const BookItem = ({ book, onEdit, onDelete }) => {
  return (
    <li className="mb-4  flex justify-between items-center">
      <span className="line-clamp-1 w-[40vw]">
        <strong>{book.booktitle}</strong> by {book.bookauthor}
      </span>
      <div>
        <button
          onClick={() => onEdit(book)}
          className="text-greenish bg-white border border-greenish px-1 md:px-3  py-1 rounded shadow hover:bg-green-600  hover:text-white mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="text-red-500 bg-white px-1 md:px-3  py-1 border border-red-500 rounded shadow hover:bg-red-600 hover:text-white"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default BookItem;
