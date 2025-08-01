import React, { useEffect, useState } from "react";

const BookStatus = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://library-management-h7qr.vercel.app/api/rent-requests"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch rent requests");
        }
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

    // Set up polling to fetch requests every 5 seconds
    const interval = setInterval(fetchRequests, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        "http://library-management-h7qr.vercel.app/api/rent-requests/approve",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId: id }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to approve request");
      }
      const updatedRequest = await response.json();
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? updatedRequest : req))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCollect = async (id) => {
    try {
      const response = await fetch(
        "http://library-management-h7qr.vercel.app/api/rent-requests/collect",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId: id }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark as collected");
      }
      const updatedRequest = await response.json();
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? updatedRequest : req))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleReturn = async (id) => {
    try {
      const response = await fetch(
        "http://library-management-h7qr.vercel.app/api/rent-requests/return",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId: id }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark as returned");
      }
      const updatedRequest = await response.json();
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Helper function to calculate time remaining
  const calculateTimeRemaining = (reservedUntil, isFined) => {
    if (isFined) return "Fined"; // Check if the fine flag is true
    const now = new Date();
    const timeLeft = new Date(reservedUntil) - now;
    if (timeLeft <= 0) return "Fined";

    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return `${hoursLeft}h ${minutesLeft}m`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Manage Book Status
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        {" "}
        {/* Apply rounded-lg to the wrapper */}
        <table className="table-auto w-full border-0 text-sm sm:text-base">
          <thead>
            <tr className="bg-greenish text-white ">
              <th className="border px-3 sm:px-4 py-2 sm:py-3">Book Title</th>
              <th className="border px-3 sm:px-4 py-2 sm:py-3">User</th>
              <th className="border px-3 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                Status
              </th>
              <th className="border px-3 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                Time Remaining
              </th>
              <th className="border px-3 sm:px-4 py-2 sm:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-100">
                  <td className="border px-3 sm:px-4 py-2 sm:py-3">
                    {req.bookTitle}
                  </td>
                  <td className="border px-3 sm:px-4 py-2 sm:py-3">
                    {req.userName}
                  </td>
                  <td className="border px-3 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                    {req.status}
                  </td>
                  <td className="border px-3 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                    {req.status === "Waiting to be Collected" &&
                      calculateTimeRemaining(req.reservedUntil, req.isFined)}
                  </td>
                  <td className="border px-3 sm:px-4 py-2 sm:py-3 flex gap-2">
                    {req.status === "Requested" && (
                      <button
                        onClick={() => handleApprove(req._id)}
                        className="bg-green-500 text-white px-3 py-3 rounded-md hover:bg-green-600 focus:ring focus:ring-green-300"
                      >
                        Approve
                      </button>
                    )}
                    {(req.status === "Waiting to be Collected" ||
                      req.status === "Late") && (
                      <button
                        onClick={() => handleCollect(req._id)}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
                      >
                        Mark as Collected
                      </button>
                    )}
                    {req.status === "Collected" && (
                      <button
                        onClick={() => handleReturn(req._id)}
                        className="bg-yellow-500 text-white px-3 py-3 rounded-md hover:bg-yellow-600 focus:ring focus:ring-yellow-300"
                      >
                        Mark as Returned
                      </button>
                    )}
                    {req.status === "Returned" && (
                      <p className="text-gray-500 font-semibold">Returned</p>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="border text-center text-gray-500 px-3 sm:px-4 py-2 sm:py-3"
                  colSpan="5"
                >
                  No Requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookStatus;
