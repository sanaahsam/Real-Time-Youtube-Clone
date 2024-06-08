import React from "react";
import DrawerSidebar from "../../Components/DrawerSidebar/DrawerSidebar";
import SearchVideo from "./SearchVideo";
import "../SearchPage/searchvideo.css";

function SearchLayout() {
  return (
    <div className="layout">
      <DrawerSidebar />
      <SearchVideo />
    </div>
  );
}

export default SearchLayout;
