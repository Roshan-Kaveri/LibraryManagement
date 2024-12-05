import { GoogleLogin } from '@react-oauth/google';

import React from 'react'

export default function GoogleLoginBtn() {
  return (
    <div className="flex justify-center z-10 mb-1">
 <GoogleLogin
    onSuccess={credentialResponse => {
      console.log(credentialResponse);
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  ></GoogleLogin>
    </div>
   
  )
}
