import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import { FaHome, FaUser, FaUserShield } from "react-icons/fa";
export default function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const { userId } = decoded; 
      fetchUser(userId); 
    }
  }, []);

  return (
    <nav className="p-2 mb-8 bg-greenish">
      <div className="flex justify-between  mx-1 md:mx-4">
        
        <div className="flex text-lg lg:text-2xl md:p-2 text-blueish hover:text-[#13423c] font-semibold">
          <h1>Library Portal</h1>
        </div>

        
        <ul className="flex gap-4 items-center mr-4">
          <li>
            <Link
              to="/"
              className="text-blueish hover:text-[#13423c] font-semibold flex items-center"
            >
              <span className="hidden sm:block text-sm lg:text-lg">Home</span>
              <FaHome className="sm:hidden text-lg" />
            </Link>
          </li>
          <li>
            {user ? (
              <Link
                to="/profile"
                className="text-blueish hover:text-[#13423c] font-semibold flex items-center"
              >
                <span className="hidden sm:block text-sm lg:text-lg">Profile</span>
                <FaUser className="sm:hidden text-lg" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-blueish hover:text-[#13423c] font-semibold flex items-center"
              >
                <span className="hidden sm:block text-sm lg:text-lg">Login</span>
                <FaUser className="sm:hidden text-lg" />
              </Link>
            )}
          </li>
          {user?.isadmin && (
            <li>
              <Link
                to="/admin"
                className="text-blueish hover:text-[#13423c] font-semibold flex items-center"
              >
                <span className="hidden sm:block text-sm lg:text-lg">Admin</span>
                <FaUserShield className="sm:hidden text-lg" />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
