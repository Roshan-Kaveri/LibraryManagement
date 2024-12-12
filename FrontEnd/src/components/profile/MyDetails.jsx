import React, { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar";

const MyDetails = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (!response.ok) {
          throw new Error("Error fetching user details");
        }

        const data = await response.json();
        setUserDetails(data);  // Set the user data in state
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]); // Run this effect when userId changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <>
    <div>Please Login</div>
    
    </>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {userDetails.name}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      {/* Add more fields if necessary */}
    </div>
  );
};

export default MyDetails;
