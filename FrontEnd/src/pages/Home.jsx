import React from "react"
import HomePage from "../components/home/Home";
import Footer from "../components/home/Footer";

const Home = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
    {/* Main Content */}
    <div className="flex-grow">
      <HomePage />
    </div>
    
    {/* Footer */}
    <Footer />
  </div>
  
  )
};

export default Home;
