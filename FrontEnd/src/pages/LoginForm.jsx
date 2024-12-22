import React from 'react'
import LoginEmail from '../components/login/LoginEmail'
import SiginEmail from '../components/login/SiginEmail'
import CenteredGradient from '../components/login/CenteredGradient'
import GoogleLoginBtn from '../components/login/GoogleLoginBtn'
import Divder from '../components/login/Divder'
import { Link } from 'react-router'
import LinkButton from '../components/login/LinkButton'

export default function LoginForm() {
  return (
    <div className='flex relative '>
  {/* First element */}
  <div className="flex flex-[2] h-[100vh] justify-center bg-blueish hidden md:flex">
    <SiginEmail />
  </div>

  {/* Second element */}
  <div className="flex flex-[8] h-[100vh] flex-col justify-center w-full md:w-auto">
    <GoogleLoginBtn />
    <Divder />
    <LoginEmail />
    <LinkButton link={'/register'} text="Already have a Account?"></LinkButton>

 
  </div>


</div>

  )
}
