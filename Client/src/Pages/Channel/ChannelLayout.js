import React, { useContext } from "react";
import Channel from "./Channel";
import Sidebar from "../../Components/sidebar/Sidebar";
import DrawerSidebar from "../../Components/DrawerSidebar/DrawerSidebar";
import { DrawerContext } from "../../context/DrawerContext";
import UploadForm from "../../Components/UploadVideo/Uploadform";

function ChannelLayout() {
  const { uploadBox } = useContext(DrawerContext);
  return (
    <div className="layout">
      <DrawerSidebar />
      <Sidebar />
      <Channel />
      {uploadBox && <UploadForm />}
    </div>
  );
}

export default ChannelLayout;
