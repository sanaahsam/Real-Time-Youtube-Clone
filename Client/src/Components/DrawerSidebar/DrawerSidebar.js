import React, { useContext } from "react";
import "../DrawerSidebar/DrawerSidebar.css";
import { DrawerContext } from "../../context/DrawerContext";
import { LiaGreaterThanSolid } from "react-icons/lia";
import Signin from "../Navbar/Signin";
import {
  MdHomeFilled,
  MdOutlineSubscriptions,
  MdOutlineOutlinedFlag,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { BsFillExclamationSquareFill } from "react-icons/bs";

import { IoSettingsOutline } from "react-icons/io5";
import { RiAccountBoxLine, RiVideoLine } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";
import { CgPlayList } from "react-icons/cg";
import { BsClock } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { UserContext } from "../../context/UserContext";
import { BiLike } from "react-icons/bi";
import Subscribe from "./Subscribe";
import { Link } from "react-router-dom";

function DrawerSidebar() {
  const { isDrawer } = useContext(DrawerContext);
  const { User } = useContext(UserContext);
  const user = User ? User._id : "";
  const ischannel = User ? User.ischannel : "";
  return (
    <div
      className="drawerSidebar"
      style={{ display: isDrawer ? "block" : "none" }}
    >
      <div className="drawer-container">
        <div className="container-home">
          <MdHomeFilled size={25} />
          <Link to="/">
            <p>Home</p>
          </Link>
        </div>
        <div className="container-home">
          <img src="/picture/shorts.png" alt="shorts" className="shorts" />
          <p>Shorts</p>
        </div>
        {User && (
          <div className="container-home">
            <MdOutlineSubscriptions size={25} />
            <p>Subscriptions</p>
          </div>
        )}
      </div>
      <div className="drawer-container2">
        {ischannel && (
          <div className="you">
            <h3>You</h3>
            <LiaGreaterThanSolid size={20} />
          </div>
        )}
        {User && ischannel && (
          <div className="container-you">
            <RiAccountBoxLine size={25} />
            <Link to={`/channel/${user}`}>
              <p>Your channel</p>
            </Link>
          </div>
        )}
        {User ? (
          ""
        ) : (
          <div className="container-you">
            <MdOutlineVideoLibrary size={25} />
            <p>You</p>
          </div>
        )}
        <div className="container-you">
          <LuHistory size={25} />
          <Link to={`/history/${user}`}>
            <p>History</p>
          </Link>
        </div>
        {User && (
          <>
            <div className="container-you">
              <CgPlayList size={25} />
              <p>Playlists</p>
            </div>
            {ischannel && (
              <div className="container-you">
                <RiVideoLine size={25} />
                <Link to={`/yourVideos/${user}`}>
                  <p>Your videos</p>
                </Link>
              </div>
            )}
            <div className="container-you">
              <BsClock size={25} />
              <p>Watch Later</p>
            </div>
            <div className="container-you">
              <BiLike size={25} />
              <Link to={`/likedVideos/${user}`}>
                {" "}
                <p>Liked videos</p>
              </Link>
            </div>
          </>
        )}
      </div>
      <div
        className="drawer-container3"
        style={{ border: ischannel ? "" : "none" }}
      >
        {User ? (
          ischannel && (
            <>
              <h3>Subscriptions</h3>
              <div className="sub-container">
                {User.Subscriptions.length === 0 ? (
                  <div>No subscriptions</div>
                ) : (
                  User.Subscriptions.map((subscription) => (
                    <Subscribe key={subscription._id} data={subscription} />
                  ))
                )}
              </div>{" "}
            </>
          )
        ) : (
          <div
            style={{
              paddingLeft: "5px",
              paddingRight: "5px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <p>Sign in to like videos, comment and subscribe.</p>
            <div className="signin-btn">
              <Signin />
              <p style={{ marginLeft: "10px", fontSize: "0.9rem" }}>Signin</p>
            </div>
          </div>
        )}
      </div>
      <div className="drawer-container4">
        <div className="container-more">
          <IoSettingsOutline size={25} />
          <p>Settings</p>
        </div>
        <div className="container-more">
          <MdOutlineOutlinedFlag size={25} />
          <p>Report history</p>
        </div>
        <div className="container-more">
          <AiOutlineQuestionCircle size={25} />
          <p>Help</p>
        </div>
        <div className="container-more">
          <BsFillExclamationSquareFill size={25} />

          <p>Send feedback</p>
        </div>
      </div>
    </div>
  );
}

export default DrawerSidebar;
