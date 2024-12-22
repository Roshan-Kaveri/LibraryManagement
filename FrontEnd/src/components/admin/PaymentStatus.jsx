import React, { useEffect, useState } from "react";

const PaymentStatus = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://libbackend.hmmbo.com/api/users/total-fines");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  
  const handleMarkPaid = async (userId) => {
    try {
      const response = await fetch("https://libbackend.hmmbo.com/api/fines/mark-paid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark fines as paid");
      }

      
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );

      alert("Fines marked as paid!");
    } catch (error) {
      console.error("Error marking fines as paid:", error);
      alert("Failed to mark fines as paid.");
    }
  };

  return (
    <div className="mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Fine Due</h1>

      {loading ? (
  <p className="text-center text-xl text-gray-500">Loading...</p>
) : (
  <div className="overflow-x-auto shadow-lg rounded-lg">
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-greenish text-white">
        <tr>
          <th className="py-3 px-4 text-left font-medium">User ID</th>
          <th className="py-3 px-4 text-left font-medium">Total Fine</th>
          <th className="py-3 px-4 text-left font-medium">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 || users.every(user => user.totalFine === 0) ? (
          <tr>
            <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
              No pending dues
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user.userId} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">{user.username}</td>
              <td className="py-3 px-4">${user.totalFine}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleMarkPaid(user.userId)}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Mark Paid
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)}
</div>
  );
};

export default PaymentStatus;
