import React, { useContext } from "react";
import "../sidebar/Sidebar.css";
import {
  MdHomeFilled,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { DrawerContext } from "../../context/DrawerContext";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

function Sidebar() {
  const { isDrawer } = useContext(DrawerContext);
  const { User } = useContext(UserContext);
  const user = User ? User._id : "";

  return (
    <div className="sidebar" style={{ display: isDrawer ? "none" : "block" }}>
      <div className="sidebar-subcontainer">
        <MdHomeFilled size={25} />
        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
      <div className="sidebar-subcontainer">
        <img src="/picture/shorts.png" alt="shorts" className="shorts" />
        <p>Shorts</p>
      </div>
      {User && User.ischannel && (
        <div className="sidebar-subcontainer" style={{ height: "80px" }}>
          <MdOutlineSubscriptions size={25} />
          <p style={{ fontSize: "0.6rem", marginBottom: "10px" }}>
            Subscriptions
          </p>
        </div>
      )}
      {user && (
        <div className="sidebar-subcontainer">
          <MdOutlineVideoLibrary size={25} />
          <Link to={`/yourVideos/${user}`}>
            <p>You</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
