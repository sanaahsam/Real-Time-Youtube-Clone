import React, { useContext } from "react";
import "../Navbar/NavbarStyle/hamburger.css";
import { DrawerContext } from "../../context/DrawerContext";

function Hamburger() {
  const { setIsDrawer } = useContext(DrawerContext);

  const show = () => {
    setIsDrawer((prev) => !prev);
  };

  return (
    <div className="hamburger" onClick={show}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
}

export default Hamburger;
