import React, { useContext } from "react";
import "../Google/GoogleLogin.css";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../../../context/UserContext";

function GoogleSignup() {
  const { dispatch } = useContext(UserContext);
  //handle succes btn

  const handleSuccess = async (credentialResponse) => {
    try {
      // Decode JWT token to extract user information
      const jwtToken = credentialResponse.credential;
      const decodedToken = parseJwt(jwtToken);

      // Access profile details from the decoded token
      const { email, given_name } = decodedToken;

      const formData = {
        Email: email,
        Name: given_name,
        Channel: false,
      };

      // Append each property of the UserData object to the FormData object

      const response = await fetch(
        "https://mernclone-sana-ahsams-projects.vercel.app/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const data = await response.json();
      localStorage.setItem("youtubeUser", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });

      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleError = (error) => {
    console.error("Login Failed:", error);
  };

  //decoding the token
  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  return (
    <div className="login">
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={handleError}
        useOneTap
        size="small"
        type="icon"
        shape="circle"
      />
      <p>Sign in</p>
    </div>
  );
}

export default GoogleSignup;
