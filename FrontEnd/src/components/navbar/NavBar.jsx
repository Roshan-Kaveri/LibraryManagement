import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const { userId } = decoded;
      setUser({ userId });
    }
  }, []);
  return (
    <nav className="p-2 mb-8 bg-greenish ">
      <div className="flex justify-between mx-4 ">
        <div className="flex text-2xl p-2 text-blueish hover:text-[#13423c] font-semibold">
          <h1 className=''>Libraray Portal</h1>
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
          )
          }
          </li>
        </ul>
      </div>
      </nav>
  )
}
