import React from "react";
import Hamburger from "../Navbar/Hamburger";
import "../Navbar/NavbarStyle/logo.css";

function Logo() {
  return (
    <div className="logo">
      <Hamburger />
      <img
        className="youtube-icon"
        src="/picture/youtubeicon.png"
        alt="youtubeicon"
      />
      <p>YouTube</p>
    </div>
  );
}

export default Logo;
