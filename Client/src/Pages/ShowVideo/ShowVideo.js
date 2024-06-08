import React, { useContext } from "react";
import "../ShowVideo/showvideo.css";
import Navbar from "../../Components/Navbar/Navbar";
import DrawerSidebar from "../../Components/DrawerSidebar/DrawerSidebar";
import WatchVideo from "./WatchVideo";
import CreateChannel from "../Channel/CreateChannel";
import { DrawerContext } from "../../context/DrawerContext";
import UploadVideo from "../../Components/UploadVideo/Uploadform";

function ShowVideo() {
  const { channelBox, uploadBox } = useContext(DrawerContext);
  return (
    <div className="showvideo">
      <Navbar />
      <DrawerSidebar />
      <WatchVideo />
      {channelBox && <CreateChannel />}
      {uploadBox && <UploadVideo />}
    </div>
  );
}

export default ShowVideo;
