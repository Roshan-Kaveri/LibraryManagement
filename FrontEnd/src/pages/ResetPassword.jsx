import React from "react"
import LoginEmail from "../components/register/LoginEmail";
import ForgotForm from "../components/forgot_password/ForgotForm";
import ResetPasswordForm from "../components/forgot_password/ResetPasswordForm";

const ForgotPassword = (props) => {
  return (
     <div className='flex relative'>
        
          <div className="flex flex-[2] h-[100vh] justify-center bg-blueish">
            <LoginEmail></LoginEmail>
          </div>
          <div className="flex flex-[8]  h-[100vh] flex-col justify-center">
          <ResetPasswordForm></ResetPasswordForm>
            </div> 
          
        </div>
  )
};

export default ForgotPassword;
