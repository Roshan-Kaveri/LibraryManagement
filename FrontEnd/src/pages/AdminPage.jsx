import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rent-requests");
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
      const response = await fetch("http://localhost:5000/api/rent-requests/approve", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId: id }),
      });
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
      const response = await fetch("http://localhost:5000/api/rent-requests/collect", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId: id }),
      });
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
      const response = await fetch("http://localhost:5000/api/rent-requests/return", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId: id }),
      });
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
    if (isFined) return "Fined";  // Check if the fine flag is true
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Book Title</th>
            <th className="border border-gray-300 px-4 py-2">User ID</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Time Remaining</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="border border-gray-300 px-4 py-2">{req.bookTitle}</td>
              <td className="border border-gray-300 px-4 py-2">{req.userId}</td>
              <td className="border border-gray-300 px-4 py-2">{req.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                {req.status === "Waiting to be Collected" &&
                  calculateTimeRemaining(req.reservedUntil, req.isFined)} {/* Check if fine is applied */}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {req.status === "Requested" && (
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                  >
                    Approve
                  </button>
                )}
                { (req.status === "Waiting to be Collected" || req.status === "Late"  ) && (
                  <button
                    onClick={() => handleCollect(req._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Mark as Collected
                  </button>
                )}
                {req.status === "Collected" && (
                  <button
                    onClick={() => handleReturn(req._id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Mark as Returned
                  </button>
                )}
                {req.status === "Returned" && (
                  <p className="text-gray-500 font-semibold">Returned</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
