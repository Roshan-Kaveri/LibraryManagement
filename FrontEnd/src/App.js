import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

import LoginForm from "./pages/LoginForm";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RegisterForm from "./pages/RegisterForm";
import BookDetails from "./components/book/BookDetails";
import Profile from "./pages/Profile";
import AdminPage from "./pages/Admin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/book/:bookid" element={<BookDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="*" element={<h1>404 Not Found</h1>} />

          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
