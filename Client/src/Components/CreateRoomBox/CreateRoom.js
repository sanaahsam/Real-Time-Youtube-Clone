import React, { useContext } from "react";
import "../CreateRoomBox/CreateRoomBox.css";
import { MdCancel } from "react-icons/md";

import { DrawerContext } from "../../context/DrawerContext";
import { v4 } from "uuid";

function CreateRoom() {
  const { RoomBox, SetRoomBox } = useContext(DrawerContext);

  const closeBox = () => {
    SetRoomBox(false);
  };

  const handleRedirect = () => {
    const newRoomUrl = `/room/${v4()}`;
    window.open(newRoomUrl, "_blank");
  };

  return (
    <div
      className="createRoom-container"
      style={{ display: RoomBox ? "flex" : "none" }}
    >
      <div onClick={closeBox} className="cancel-btn">
        <MdCancel size={25} />
      </div>
      <p>
        Create a room and invite others to join via a link for seamless video
        calls, screen sharing, and recording, with recordings saved directly to
        your device.
      </p>
      <div className="createRoom-subcontainer">
        <button onClick={handleRedirect}>Create Room</button>
      </div>
    </div>
  );
}

export default CreateRoom;
