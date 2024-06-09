import React from "react";

import "../Home/home.css";
import Home from "./Home";
import Sidebar from "../../Components/sidebar/Sidebar";
import DrawerSidebar from "../../Components/DrawerSidebar/DrawerSidebar";

function HomeLayout() {
  return (
    <div className="layout">
      <DrawerSidebar />
      <Sidebar />

      <Home />
    </div>
  );
}

export default HomeLayout;
