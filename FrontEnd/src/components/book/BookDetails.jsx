import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import NavBar from "../navbar/NavBar";

const BookDetails = () => {
  const bookId = useParams().bookid;
  const [book, setBook] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Decode token and set user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const { userId } = decoded;
      setUser({ userId });
    }
  }, []);

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books", {
          method: "POST",  // Use POST method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId })  // Send bookId in the request body
        });

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookDetails();
  }, [bookId]);  // Fetch book details when bookId changes

  // Fetch request status when book or user changes
  useEffect(() => {
    if (!book || !user) return;  // Ensure both book and user are set

    const fetchRequestStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/requests/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.userId,
            bookId: book._id  // Send bookId as part of POST body
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch request status");
        }
        const data = await response.json();
        setRequestStatus(data.status);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);  // Set loading to false when request is complete
      }
    };

    fetchRequestStatus();
  }, [book, user]);  // Run this effect when either book or user changes

  // Handle rent request
  const handleRequestRent = async () => {
    if (!user || !book) return;  // Ensure both user and book are available

    try {
      const response = await fetch(`http://localhost:5000/api/requests/rent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.userId,
          bookId: book._id,  
          bookTitle: book.booktitle // Send bookId inside POST data
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to request the book");
      }
      setRequestStatus("Requested");
    } catch (err) {
      console.error(err.message);
    }
  };

  // If loading, display loading message
  if (isLoading) return <p className="text-center text-gray-700">Loading...</p>;

  // If error, display error message
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0 lg:w-2/5">
            <img
              src={book.img || "https://via.placeholder.com/300x400"}
              alt={book.booktitle}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col lg:flex-1">
            <h1 className="text-6xl font-bold text-gray-800">{book.booktitle}</h1>
            <p className="text-2xl text-gray-600 mt-2 leading-none">Author</p>
            <p className="text-xl text-gray-600 leading-none">{book.bookauthor}</p>
            <p className="mt-4 text-2xl text-gray-600 mt-2 leading-none">About The Book</p>
            <p className="text-gray-700 text-xl leading-relaxed">{book.bookdesc}</p>
            <div className="mt-6">
              <p className="text-gray-500 text-xl">
                <span className="font-semibold text-xl">Category:</span> {book.category || "N/A"}
              </p>
              <p className="text-gray-500 mt-1 text-xl">
                <span className="font-semibold text-xl">Published Year:</span> {book.publishedYear || "N/A"}
              </p>
            </div>
            <div className="mt-4 flex items-center">
              <p className="text-yellow-500 text-xl">
                <span className="font-semibold text-xl text-gray-500">Rating</span> <br/> {"★".repeat(book.ratings || 0)}
              </p>
            </div>
            {requestStatus ? (
              <p className="mt-6 text-xl text-gray-700">Request Status: {requestStatus}</p>
            ) : (
              <button
                onClick={handleRequestRent}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Request to Rent
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
