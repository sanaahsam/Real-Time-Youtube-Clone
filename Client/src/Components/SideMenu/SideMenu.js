import React, { useContext } from "react";
import "../SideMenu/SideMenu.css";
import { FaGoogle, FaRegKeyboard } from "react-icons/fa";
import { MdOutlineSwitchAccount, MdHelpOutline } from "react-icons/md";
import { PiSignOut, PiGlobe } from "react-icons/pi";
import { SiYoutubemusic } from "react-icons/si";
import {
  IoMoonOutline,
  IoLanguageOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { TbShieldExclamation } from "react-icons/tb";
import { BsExclamationSquare } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiMoneyDollarCircleLine, RiAccountPinBoxLine } from "react-icons/ri";
import { UserContext } from "../../context/UserContext";
import { DrawerContext } from "../../context/DrawerContext";
import { Link } from "react-router-dom";

function SideMenu() {
  const { User, dispatch } = useContext(UserContext);
  const { setShowMenu, setChannelBox } = useContext(DrawerContext);
  //signout the user

  const signout = () => {
    setShowMenu(false);
    localStorage.removeItem("YoutubeUser");
    dispatch({ type: "LOGOUT" });
  };

  const showBox = () => {
    setShowMenu(false);
    setChannelBox(true);
  };

  const closesidemenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="sideMenu">
      <div className="sidemenu-container1">
        <div
          className="user-icon"
          style={{ backgroundColor: User.ischannel ? "transparent" : "" }}
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
        <div className="user-info">
          <p>{`${User.name}`}</p>
          <p
            style={{
              marginBottom: "10px",
              fontSize: "0.9rem",
              letterSpacing: "0.01rem",
            }}
          >
            {User.ischannel ? `@${User.handle}` : `${User.email}`}
          </p>
          <span>
            {User.ischannel ? (
              <Link onClick={closesidemenu} to={`/channel/${User._id}`}>
                <p>View channel</p>
              </Link>
            ) : (
              <p onClick={showBox}>Create a channel</p>
            )}
          </span>
        </div>
      </div>
      <div className="sidemenu-container">
        <div className="sidemenu-subcontainer">
          <FaGoogle size={20} />
          <p>Google Account</p>
        </div>
        <div className="sidemenu-subcontainer">
          <MdOutlineSwitchAccount size={20} />
          <p>Switch account</p>
        </div>
        <div className="sidemenu-subcontainer" onClick={signout}>
          <PiSignOut size={20} />
          <p style={{ marginRight: "90px" }}>Sign out</p>
          <MdOutlineKeyboardArrowRight size={25} />
        </div>
      </div>

      <div className="sidemenu-container">
        <div className="sidemenu-subcontainer">
          <SiYoutubemusic size={20} />
          <p>YouTube Studio</p>
        </div>
        <div className="sidemenu-subcontainer">
          <RiMoneyDollarCircleLine size={20} />
          <p>Purchases and memberships</p>
        </div>
      </div>
      <div className="sidemenu-container">
        <div className="sidemenu-subcontainer">
          <RiAccountPinBoxLine size={20} />
          <p>Your data in YouTube </p>
        </div>
        <div className="sidemenu-subcontainer">
          <IoMoonOutline size={20} />
          <p>Appearance: Dark</p>
        </div>
        <div className="sidemenu-subcontainer">
          <IoLanguageOutline size={20} />
          <p>Language: English</p>
        </div>
        <div className="sidemenu-subcontainer">
          <TbShieldExclamation size={20} />
          <p>Restricted Mode: Off</p>
        </div>
        <div className="sidemenu-subcontainer">
          <PiGlobe size={20} />
          <p>Location: India</p>
        </div>
        <div className="sidemenu-subcontainer">
          <FaRegKeyboard size={20} />
          <p>Keyboard shortcuts</p>
        </div>
      </div>
      <div className="sidemenu-container">
        <div className="sidemenu-subcontainer">
          <IoSettingsOutline size={20} />
          <p>Settings</p>
        </div>
      </div>
      <div className="sidemenu-container">
        <div className="sidemenu-subcontainer">
          <MdHelpOutline size={20} />
          <p>Help</p>
        </div>
        <div className="sidemenu-subcontainer">
          <BsExclamationSquare size={20} />
          <p>Send feedback</p>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
