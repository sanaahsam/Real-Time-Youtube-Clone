import React, { useContext } from "react";
import "../Navbar/NavbarStyle/navOption.css";
import { RiVideoAddLine } from "react-icons/ri";
import Signin from "./Signin";
import { FaRegBell } from "react-icons/fa";
import { DrawerContext } from "../../context/DrawerContext";
import SideMenu from "../SideMenu/SideMenu";

import { MdOutlineMissedVideoCall } from "react-icons/md";
import { UserContext } from "../../context/UserContext";

function NavOption() {
  const currentTime = new Date().getHours();

  const isVisible = currentTime >= 18 && currentTime < 24;
  const { showMenu, setShowMenu, setUploadBox, SetRoomBox } =
    useContext(DrawerContext);
  const { User } = useContext(UserContext);
  const ischannel = User ? User.ischannel : "";
  const isMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const uploadbox = () => {
    setUploadBox(true);
  };

  const openRoomBox = () => {
    SetRoomBox(true);
  };

  return (
    <div className="nav-option">
      {User && (
        <>
          {User && ischannel && (
            <div className="icon" onClick={uploadbox}>
              <RiVideoAddLine size={20} />
            </div>
          )}
          <div className="icon">
            <FaRegBell size={20} />
          </div>
          {isVisible && (
            <div
              className="icon"
              style={{ marginRight: "15px" }}
              onClick={openRoomBox}
            >
              <MdOutlineMissedVideoCall size={27} />
            </div>
          )}
        </>
      )}
      {User ? (
        <div
          className="user-icon"
          style={{ backgroundColor: User.ischannel ? "transparent" : "" }}
          onClick={isMenu}
        >
          {User.ischannel ? (
            <img
              src={`https://mernclone-sana-ahsams-projects.vercel.app/${User.profile}`}
              alt="user-pfp"
              style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            />
          ) : (
            `${User.name.charAt(0)}`
          )}
        </div>
      ) : (
        <div className="signin-btn">
          <Signin />
          <p style={{ marginLeft: "10px", fontSize: "0.9rem" }}>Signin</p>
        </div>
      )}

      {showMenu ? <SideMenu /> : ""}
    </div>
  );
}

export default NavOption;
