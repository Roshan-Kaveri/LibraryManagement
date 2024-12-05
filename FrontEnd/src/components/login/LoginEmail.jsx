import React, { useState } from 'react';

export default function LoginEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');

    try {
      // Send POST request to backend with email and password using fetch
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token); 
        window.location.href = '/';
      } else {
        setErrorMessage(data.message || 'Invalid email or password');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2 p-4 z-10">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-80 h-12 bg-[#EFFAFC] border border-[#169180] rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-80 h-12 bg-[#EFFAFC] border border-[#169180] rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />
      <button
        type="submit"
        className="w-80 mt-2 h-12 bg-[#169180] border border-[#169180] rounded-md text-white font-bold hover:bg-[#117060] transition-all"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <button type="button" className="text-blue-500 mt-2">
        Forgot your password? Click here
      </button>
    </form>
  );
}
