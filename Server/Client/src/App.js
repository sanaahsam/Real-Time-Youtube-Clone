import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import { DrawerContext } from "./context/DrawerContext";

import CreateChannel from "./Pages/Channel/CreateChannel";

import UploadForm from "./Components/UploadVideo/Uploadform";
import CreateRoom from "./Components/CreateRoomBox/CreateRoom";

function App() {
  const { uploadBox, channelBox } = useContext(DrawerContext);

  return (
    <div className="App">
      <Navbar />

      <Outlet />
      {uploadBox && <UploadForm />}
      <CreateRoom />
      {channelBox && <CreateChannel />}
    </div>
  );
}

export default App;
