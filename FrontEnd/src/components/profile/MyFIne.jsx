import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react"; // Import the QRCode package

const MyFines = ({ user }) => {
  const [fines, setFines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState({}); // To store books fetched based on bookId
  const [isPC, setIsPC] = useState(false); // To determine if the user is on PC
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    // Detect if the user is on PC
    const userAgent = navigator.userAgent.toLowerCase();
    const isPC = !/android|iphone|ipad|ipod|windows phone/i.test(userAgent); // PC detection logic
    setIsPC(isPC);

    const fetchFines = async () => {
      try {
        const userId = user.userId;
        const response = await fetch("https://libbackend.hmmbo.com/api/unpaid-fines", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setFines(data.fines);

        // Fetch book details for each fine
        data.fines.forEach((fine) => {
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
        const response = await fetch(`https://libbackend.hmmbo.com/api/books/${bookId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const book = await response.json();
        setBooks((prevBooks) => ({
          ...prevBooks,
          [bookId]: book.booktitle,
        }));
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchFines();
  }, [user]);

  const handlePayAllNow = () => {
    const totalAmount = fines.reduce((total, fine) => total + fine.amount, 0);

    if (!totalAmount) {
      alert("No fines to pay.");
      return;
    }

    // Generate UPI Intent Link (for PC)
    const upiLink = `upi://pay?pa=yourname@bank&pn=Library&am=${totalAmount}&cu=INR&tn=Payment for Library Fines`;

    // Show modal with QR code if on PC
    if (isPC) {
      setShowModal(true);
    } else {
      // For mobile devices, redirect to the UPI app
      window.location.href = upiLink;
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const totalAmount = fines.reduce((total, fine) => total + fine.amount, 0);

  const formatStartTime = (startTime) => {
    const date = new Date(startTime);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto p-6">
      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : fines.length > 0 ? (
        <>      <h2 className="text-2xl text-greenish font-semibold mb-4">Unpaid Fines</h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-greenish text-white">
                <th className="px-4 py-2 border">Book Title</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Fined On</th>
              </tr>
            </thead>
            <tbody>
              {fines.map((fine) => (
                <tr key={fine._id} className="border-b">
                  <td className="px-4 py-2">
                    {books[fine.bookId] || "Loading..."}
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
              className="ml-4 px-6 py-2 bg-greenish text-white rounded hover:bg-green-800"
            >
              Pay All Now
            </button>
          </div>
        </div>
        </>

      ) : (
        <p></p>
      )}

      {/* Modal for QR code */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 pl-14 pr-14 rounded shadow-lg text-center">
            <h3 className="text-4xl font-semibold mb-4">Scan to Pay</h3>
            <QRCodeSVG
              className="h-80 w-auto"
              value={`upi://pay?pa=yourname@bank&pn=Library&am=${totalAmount}&cu=INR&tn=Payment for Library Fines`}
            />
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFines;
