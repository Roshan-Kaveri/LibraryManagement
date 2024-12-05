import React from 'react'
import LoginEmail from '../components/register/LoginEmail'
import RegisterEmail from '../components/register/RegisterEmail'
import CenteredGradient from '../components/login/CenteredGradient'
import GoogleLoginBtn from '../components/login/GoogleLoginBtn'
import Divder from '../components/login/Divder'

export default function RegisterForm() {
  return (
    <div className='flex relative'>
    
      <div className="flex flex-[2] h-[100vh] justify-center bg-blueish">
        <LoginEmail></LoginEmail>
      </div>
      <div className="flex flex-[8]  h-[100vh] flex-col justify-center">
      <GoogleLoginBtn></GoogleLoginBtn>
      <Divder></Divder>
      <RegisterEmail></RegisterEmail>
        <CenteredGradient />
        </div> 
      
    </div>
  )
}
