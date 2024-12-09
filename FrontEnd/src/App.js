import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import LoginForm from "./pages/LoginForm";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RegisterForm from "./pages/RegisterForm";
import BookDetails from "./components/book/BookDetails";
import AdminPage from "./pages/AdminPage";

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


            <Route path="/admin" element={<AdminPage />} />

          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
