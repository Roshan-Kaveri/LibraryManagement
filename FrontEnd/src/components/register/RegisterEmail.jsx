import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterEmail() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    setError("");

    try {
      const response = await fetch(
        "https://library-management-h7qr.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Registration successful! You can now login.");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        setError(data.error || "Error during registration. Please try again.");
      }
    } catch (error) {
      setError("Error during registration. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-2 p-4 z-10"
    >
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}

      <input
        type="text"
        name="name"
        placeholder="UserName"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-80 h-12 bg-blueish border border-greenish rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-80 h-12 bg-[#EFFAFC] border border-[#169180] rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-80 h-12 bg-blueish border border-greenish rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="w-80 h-12 bg-blueish border border-greenish rounded-md px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#169180]"
      />
      <button
        type="submit"
        className="w-80 mt-2 h-12 bg-greenish border border-blueish rounded-md text-blueish font-bold hover:bg-[#117060] transition-all"
      >
        Register
      </button>
    </form>
  );
}
