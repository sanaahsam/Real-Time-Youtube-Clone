import React from "react";
import DrawerSidebar from "../../Components/DrawerSidebar/DrawerSidebar";
import Sidebar from "../../Components/sidebar/Sidebar";
import WatchLatervdeos from "./WatchLatervdeo";

function WatchLaterLayout() {
  return (
    <div className="layout">
      <DrawerSidebar />
      <Sidebar />
      <WatchLatervdeos />
    </div>
  );
}

export default WatchLaterLayout;
