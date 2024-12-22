import React from "react"
import LoginEmail from "../components/register/LoginEmail";
import ForgotForm from "../components/forgot_password/ForgotForm";
import ResetPasswordForm from "../components/forgot_password/ResetPasswordForm";
import LinkButton from "../components/login/LinkButton";

const ForgotPassword = (props) => {
  return (
    <div className="flex relative">
  
  <div className="flex flex-[2] h-[100vh] justify-center bg-blueish hidden md:flex">
    <LoginEmail />
  </div>

  
  <div className="flex flex-[8] h-[100vh] flex-col justify-center w-full md:w-auto">
    <ResetPasswordForm />
    <LinkButton link={'/'} text="Go Back"></LinkButton>

  </div>
  

</div>

  )
};

export default ForgotPassword;
