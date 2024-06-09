import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../../context/UserContext";

function Signin() {
  const { dispatch } = useContext(UserContext);

  const handleSuccess = async (credentialResponse) => {
    //decoding credentiall
    const { credential } = credentialResponse;
    const parts = credential.split(".");
    const decodedPayload = JSON.parse(
      atob(parts[1].replace(/_/g, "/").replace(/-/g, "+"))
    );

    // Store user information in variables
    const profilePic = decodedPayload.picture;

    const name = decodedPayload.given_name;
    const email = decodedPayload.email;

    const UserData = {
      Picture: profilePic,
      Email: email,
      Name: name,
      Channel: false,
    };

    try {
      const response = await fetch(
        "https://mernclone-sana-ahsams-projects.vercel.app/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(UserData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "LOGIN", payload: data });
        localStorage.setItem("YoutubeUser", JSON.stringify(data));
      }

      if (!response.ok) {
        console.log(data.err);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleLogin
      size="small"
      onSuccess={handleSuccess}
      onError={handleError}
      type="icon"
      shape="pill"
      useOneTap
    />
  );
}

export default Signin;
