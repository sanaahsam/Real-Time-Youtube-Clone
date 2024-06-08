import React from "react";
import DrawerSidebar from "../../Components/DrawerSidebar/DrawerSidebar";
import Sidebar from "../../Components/sidebar/Sidebar";
import HistoryPage from "./HistoryPage";

function AllHistoryLayout() {
  return (
    <div className="layout">
      <DrawerSidebar />
      <Sidebar />
      <HistoryPage />
    </div>
  );
}

export default AllHistoryLayout;
