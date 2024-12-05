import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; 

export default function Home() {
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
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Hello, Tailwind CSS!
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Your React app with Tailwind CSS is working perfectly.
      </p>
      {user ? (
        <div className="mt-4">
          <p>User ID: {user.userId}</p>
        </div>
      ) : (
        <p className="mt-4 text-lg text-red-600">No user information available. Please log in.</p>
      )}
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Click Me
      </button>
    </div>
  );
}
