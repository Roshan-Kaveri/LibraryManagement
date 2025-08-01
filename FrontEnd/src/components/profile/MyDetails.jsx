import React, { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar";

const MyDetails = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://library-management-h7qr.vercel.app/api/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching user details");
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return (
      <>
        <div>Please Login</div>
      </>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <div class="relative inline-block">
        <h1 class="text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-greenish  to-[#71f3d5]">
          <p>{userDetails.name}</p>
        </h1>

        <div class="relative flex flex-col justify-center inline- self-center items-center">
          <span class="text-2xl md:text-3xl font-semibold">
            <p>{userDetails.email}</p>
          </span>
          <span class="flex -bottom-1 left-0 w-64 h-1 bg-gradient-to-r from-greenish via-sky-400 to-cyan-500 rounded-full"></span>
        </div>
      </div>
      <button
        class="rounded-md mt-2  bg-red-600 px-4 py-2 font-bold leading-none text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default MyDetails;
