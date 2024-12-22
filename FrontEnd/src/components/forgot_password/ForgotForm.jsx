import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function ForgotForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');
    setMessage('');

    try {
      const response = await fetch('https://libbackend.hmmbo.com/api/auth/send-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('email sent successfully. Please check your inbox.');
        navigate('/login')
      } else {
        setErrorMessage(data.message || 'Failed to send password reset email.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error during forgot password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 p-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-80 h-12 bg-[#EFFAFC] border border-[#169180] rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />
      <button
        type="submit"
        className="w-80 mt-2 h-12 bg-[#169180] border border-[#169180] rounded-md text-white font-bold hover:bg-[#117060] transition-all"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Password'}
      </button>
    </form>
  );
}
