import React from 'react'
import LoginEmail from '../components/register/LoginEmail'
import RegisterEmail from '../components/register/RegisterEmail'
import CenteredGradient from '../components/login/CenteredGradient'
import GoogleLoginBtn from '../components/login/GoogleLoginBtn'
import Divder from '../components/login/Divder'
import LinkButton from '../components/login/LinkButton'

export default function RegisterForm() {
  return (
    <div className="flex relative">
  
  <div className="flex flex-[2] h-[100vh] justify-center bg-blueish hidden md:flex">
    <LoginEmail />
  </div>

  
  <div className="flex flex-[8] h-[100vh] flex-col justify-center w-full md:w-auto">
    <GoogleLoginBtn />
    <Divder />
    <RegisterEmail />
    <LinkButton link={'/login'} text="Don't have a Account?"></LinkButton>
  </div>
</div>
  )
}
