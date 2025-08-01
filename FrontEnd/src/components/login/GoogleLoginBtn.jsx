import { GoogleLogin } from "@react-oauth/google";
import React from "react";

export default function GoogleLoginBtn() {
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await fetch(
        "http://library-management-h7qr.vercel.app/api/auth/google-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: credentialResponse.credential,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("User authenticated successfully:", data);
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        console.log("Error:", data.error);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="flex justify-center z-10 mb-1">
      <GoogleLogin
        width={325}
        onSuccess={(credentialResponse) =>
          handleGoogleLogin(credentialResponse)
        }
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
