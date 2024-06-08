import React, { createContext, useState } from "react";

export const DrawerContext = createContext();

export default function DrawerContextProvider({ children }) {
  const [isDrawer, setIsDrawer] = useState(false); //for showing ther drawer sidebar
  const [showMenu, setShowMenu] = useState(false); //for the sidemenu
  const [channelBox, setChannelBox] = useState(false); //for channel box to create the channel
  const [uploadBox, setUploadBox] = useState(false);
  const [RoomBox, SetRoomBox] = useState(false);

  return (
    <DrawerContext.Provider
      value={{
        isDrawer,
        setIsDrawer,
        showMenu,
        setShowMenu,
        channelBox,
        setChannelBox,
        uploadBox,
        setUploadBox,
        RoomBox,
        SetRoomBox,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
