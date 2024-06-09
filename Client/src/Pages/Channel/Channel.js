import React from "react";
import "../Channel/Channel.css";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import useFetchChannel from "../../Hooks/FetchChannel";

function Channel() {
  const { Channel } = useFetchChannel();
  return (
    <div className="channel-container">
      <div className="channel-subcontainer">
        <img
          src={`https://mernclone-6an5.onrender.com/${Channel.profile}`}
          alt="Channel-pfp"
        />
        <div className="channel-info">
          <h1>{Channel.name}</h1>
          <p className="handle">{`@${Channel.handle}`}</p>
          <div className="more-btn">
            <p>More about this channel </p>
            <MdOutlineKeyboardArrowRight size={20} />
          </div>
          <div className="channel-btns">
            <div>
              <p>Customise channel</p>
            </div>
            <div>
              <p>Manage videos</p>
            </div>
            <div>
              <p>{`${Channel.points}`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-playlist-btns">
        <div>
          <p>Home</p>
        </div>
        <div>
          <p>Playlists</p>
        </div>
      </div>
    </div>
  );
}

export default Channel;
