import React, { useState, useEffect } from "react";
import BookStatus from "../components/admin/BookStatus";
import PaymentStatus from "../components/admin/PaymentStatus";
import AddBookForm from "../components/admin/AddBookForm";
import ManageBooks from "../components/admin/ManageBooks";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        fetch(`http://library-management-h7qr.vercel.app/api/users/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.isadmin) {
              setIsAdmin(true);
            } else {
              alert("Access Denied: You are not an admin.");
              navigate("/");
            }
          })
          .catch((err) => {
            console.error("Error fetching user data:", err);
            navigate("/login");
          });
      } catch (err) {
        console.error("Error decoding token:", err);
        navigate("/login");
      }
    } else {
      alert("Please log in.");
      navigate("/login");
    }
  }, [navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <NavBar></NavBar>
      <BookStatus />
      <PaymentStatus />
      <AddBookForm />
      <ManageBooks />
    </div>
  );
};

export default AdminPage;
