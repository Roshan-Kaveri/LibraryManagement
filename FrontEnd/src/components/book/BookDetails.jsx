import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { jwtDecode } from "jwt-decode"; 
import NavBar from "../navbar/NavBar";
import { useNavigate } from 'react-router-dom'; 


const BookDetails = () => {
  const bookId = useParams().bookid;
  const [book, setBook] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    const { userId } = decoded;
    setUser({ userId });
  } else {
    
    navigate('/login');
  }
}, []);


  
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books", {
          method: "POST",  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId })  
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
  }, [bookId]);  

  
  useEffect(() => {
    if (!book || !user) return;  

    const fetchRequestStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/requests/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.userId,
            bookId: book._id  
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
        setIsLoading(false);  
      }
    };

    fetchRequestStatus();
  }, [book, user]);  

  
  const handleRequestRent = async () => {
    if (!user || !book) return;  
    try {
      const response = await fetch(`http://localhost:5000/api/requests/rent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.userId,
          bookId: book._id,  
          bookTitle: book.booktitle 
        }),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to request the book");
      }
      setRequestStatus("Requested");
    } catch (err) {
      console.error(err.message);
    }
  };

  
  if (isLoading) return <p className="text-center text-gray-700">Loading...</p>;

  
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  console.log(requestStatus)
  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-shrink-0 h-[75vh] overflow-hidden lg:w-2/5">
  <img
    src={book.img || "https://via.placeholder.com/300x400"}
    alt={book.booktitle || "Book Image"}
    className="w-full h-full rounded-lg object-cover object-top shadow-md"
  />
</div>

          <div className="flex flex-col lg:flex-1">
            <h1 className="text-6xl font-bold text-gray-800">{book.booktitle}</h1>
            <div className="flex w-40 mt-2">
            <hr className="border-t-4 border-greenish w-full" />
          </div>
            <div className="flex mt-1">
            <sup className="text-sm text-greenish mt-2 leading-none">by</sup>
            <p className="text-xl pl-2 text-gray-600 leading-none">{book.bookauthor}</p>
            </div>
            <p className="mt-4 text-2xl text-greenish font-bold mt-2 leading-none">About The Book</p>
            <p className="text-gray-700 text-xl leading-relaxed">{book.bookdesc}</p>
            <div className="mt-6">
              <p className="text-gray-500 text-xl">
                <span className="font-semibold text-greenish text-xl">Category:</span> {book.category || "N/A"}
              </p>
              <p className="text-gray-500 mt-1 text-xl">
                <span className="font-semibold text-greenish text-xl">Published Year:</span> {book.publishedYear || "N/A"}
              </p>
            </div>
            <div className=" flex items-center">
              <p className="text-yellow-500 text-xl">
                <span className="font-semibold text-xl text-greenish">Rating:</span>  {"★".repeat(book.ratings || 0)}
              </p>
            </div>
            <div className="flex  mt-6">
  {requestStatus ? (
    <div className="flex">
          <p className="text-xl border-2 border-greenish px-6 py-2 rounded-lg bg-green-800 text-white transition-all duration-300">
      {requestStatus}</p>

    </div>
  ) : (
    <button
      onClick={handleRequestRent}
      className="inline-flex items-center justify-center border-2 border-greenish text-greenish px-6 py-2 rounded-lg hover:bg-green-800 hover:text-white transition-all duration-300"
    >
      Request to Rent
    </button>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
