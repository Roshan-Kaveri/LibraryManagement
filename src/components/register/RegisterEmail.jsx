import React from 'react';
import { Link } from 'react-router';

export default function RegisterEmail() {
  return (
    <form className="flex flex-col justify-center items-center gap-2 p-4 z-10">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-80 h-12 bg-[#EFFAFC] border border-[#169180] rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-80 h-12 bg-blueish border border-greenish rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />
       <input
        type="password"
        name="password"
        placeholder="Confirm Password"
        required
        className="w-80 h-12 bg-blueish border border-greenish rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />
      <input
        type="tel"
        name="tel"
        placeholder="Phone Number"
        required
        className="w-80 h-12 bg-blueish border border-greenish rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />

      <button
        type="submit"
        className="w-80 mt-2 h-12 bg-greenish border border-blueish rounded-md text-blueish font-bold hover:bg-[#117060] transition-all"
      >
        Register
      </button>
      <Link to='/forgotpassword'>
      <button>forgot your password? click here</button>
      </Link>
    </form>
  );
}
