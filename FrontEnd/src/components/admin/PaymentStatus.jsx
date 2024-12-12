import React, { useEffect, useState } from "react";

const PaymentStatus = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the users with their total fines
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/total-fines");
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

  // Handle "Paid" button click
  const handleMarkPaid = async (userId) => {
    try {
      const response = await fetch("http://localhost:5000/api/fines/mark-paid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark fines as paid");
      }

      // Remove the user from the list once their fines are marked as paid
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
    <div>
      <h2>Users with Pending Fines</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Total Fine</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.username}</td>
                <td>${user.totalFine}</td>
                <td>
                  <button
                    onClick={() => handleMarkPaid(user.userId)}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Mark Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentStatus;
