import React from "react";

import Sidebar from "../../Components/sidebar/Sidebar";
import DrawerSidebar from "../../Components/DrawerSidebar/DrawerSidebar";
import "../Home/home.css";
import Home from "./Home";

function Layout() {
  return (
    <div className="layout">
      <DrawerSidebar />
      <Sidebar />
      <Home />
    </div>
  );
}

export default Layout;
