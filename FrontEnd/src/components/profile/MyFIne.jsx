import React, { useState, useEffect } from "react";

const MyFines = ({ user }) => {
  const [fines, setFines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // To store books fetched based on bookId
  const [books, setBooks] = useState({});

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const userId = user.userId; // Replace with actual userId
        const response = await fetch('http://localhost:5000/api/unpaid-fines', {
          method: 'POST', // Use POST request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }) // Send userId in the body
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setFines(data.fines);
        
        // Fetch book details for each fine
        data.fines.forEach(fine => {
          fetchBookDetails(fine.bookId);
        });
      } catch (error) {
        console.error("Error fetching fines:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchBookDetails = async (bookId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${bookId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const book = await response.json();
        setBooks((prevBooks) => ({
          ...prevBooks,
          [bookId]: book.booktitle
        }));
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchFines();
  }, [user]);

  const handlePayAllNow = async () => {
    const totalAmount = fines.reduce((total, fine) => total + fine.amount, 0);
    try {
      const response = await fetch('http://localhost:5000/api/pay-fine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fineIds: fines.map(fine => fine._id) }), // Send all fine IDs
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setFines([]); // Clear all fines after payment
      alert(`Paid total: $${totalAmount}`);
    } catch (error) {
      console.error("Error paying fines:", error);
    }
  };

  const totalAmount = fines.reduce((total, fine) => total + fine.amount, 0);

  const formatStartTime = (startTime) => {
    const date = new Date(startTime);
    return date.toLocaleString(); // Formats as date and time in a readable format
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Unpaid Fines</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : fines.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Book Title</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Fined On</th>
              </tr>
            </thead>
            <tbody>
              {fines.map(fine => (
                <tr key={fine._id} className="border-b">
                  <td className="px-4 py-2">
                    {books[fine.bookId] || 'Loading...'}
                  </td>
                  <td className="px-4 py-2">${fine.amount}</td>
                  <td className="px-4 py-2">{formatStartTime(fine.startTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <span className="font-semibold">Total: ${totalAmount}</span>
            <button
              onClick={handlePayAllNow}
              className="ml-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Pay All Now
            </button>
          </div>
        </div>
      ) : (
        <p>No unpaid fines.</p>
      )}
    </div>
  );
};

export default MyFines;
