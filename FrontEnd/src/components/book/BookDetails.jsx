import React from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { bookid } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Book Details</h1>
      <p className="mt-2">Book ID: {bookid}</p>
    </div>
  );
};

export default BookDetails;
