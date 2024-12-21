import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Remove curly braces from jwtDecode

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
      const { userId } = decoded; // Extract userId from token
      fetchUser(userId); // Fetch user details from backend
    }
  }, []);

  return (
    <nav className="p-2 mb-8 bg-greenish">
      <div className="flex justify-between mx-4">
        <div className="flex text-2xl p-2 text-blueish hover:text-[#13423c] font-semibold">
          <h1>Library Portal</h1>
        </div>
        <ul className="flex gap-4 items-center mr-4">
          <li>
            <Link to="/" className="text-blueish text-lg hover:text-[#13423c] font-semibold">
              Home
            </Link>
          </li>
          <li>
            {user ? (
              <Link to="/profile" className="text-blueish text-lg hover:text-[#13423c] font-semibold">
                Profile
              </Link>
            ) : (
              <Link to="/login" className="text-blueish text-lg hover:text-[#13423c] font-semibold">
                Login
              </Link>
            )}
          </li>
          {user?.isadmin ? (
            <li>
              <Link
                to="/admin"
                className="text-blueish text-lg hover:text-[#13423c] font-semibold"
              >
                Admin
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}
