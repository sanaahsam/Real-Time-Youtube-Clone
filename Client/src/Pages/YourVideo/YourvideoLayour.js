import React from "react";
import DrawerSidebar from "../../Components/DrawerSidebar/DrawerSidebar";
import Sidebar from "../../Components/sidebar/Sidebar";

import YourVideos from "./YourVideos";

function YourvideoLayout() {
  return (
    <div className="layout">
      <DrawerSidebar />
      <Sidebar />

      <YourVideos />
    </div>
  );
}

export default YourvideoLayout;
