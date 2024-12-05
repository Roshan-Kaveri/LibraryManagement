import React from 'react'
import LoginEmail from '../components/login/LoginEmail'
import SiginEmail from '../components/login/SiginEmail'
import CenteredGradient from '../components/login/CenteredGradient'
import GoogleLoginBtn from '../components/login/GoogleLoginBtn'
import Divder from '../components/login/Divder'

export default function LoginForm() {
  return (
    <div className='flex relative'>
    
      <div className="flex flex-[2] h-[100vh] justify-center bg-blueish">
        <SiginEmail></SiginEmail>
      </div>
      <div className="flex flex-[8]  h-[100vh] flex-col justify-center">
      <GoogleLoginBtn></GoogleLoginBtn>
      <Divder></Divder>
      <LoginEmail></LoginEmail>
        <CenteredGradient />
        </div> 
      
    </div>
  )
}
