import React from "react";
import Logo from "./logo";
import SearchBar from "./SearchBar";
import NavOption from "./NavOption";
import "../Navbar/NavbarStyle/navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <Logo />
      <SearchBar />
      <NavOption />
    </div>
  );
}

export default Navbar;
