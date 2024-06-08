import React from "react";
import DrawerSidebar from "../../Components/DrawerSidebar/DrawerSidebar";
import Sidebar from "../../Components/sidebar/Sidebar";
import LikedVideo from "./LikedVideo";

function LikedLayout() {
  return (
    <div className="layout">
      <DrawerSidebar />
      <Sidebar />

      <LikedVideo />
    </div>
  );
}

export default LikedLayout;
