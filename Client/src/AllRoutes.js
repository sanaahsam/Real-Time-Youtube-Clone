import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import ChannelLayout from "./Pages/Channel/ChannelLayout";
import HomeLayout from "./Pages/Home/HomeLayout";
import { UserContext } from "./context/UserContext";
import ShowVideo from "./Pages/ShowVideo/ShowVideo";
import LikedLayout from "./Pages/likedVideo playlist/LikedLayout";
import AllHistoryLayout from "./Pages/History/AllHistoryLayout";
import YourvideoLayout from "./Pages/YourVideo/YourvideoLayour";
import Room from "./Components/CreateRoomBox/Room";
import SearchLayout from "./Pages/SearchPage/SearchPageLayout";

function AllRoutes() {
  const { User } = useContext(UserContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeLayout />} />
          <Route
            path="/channel/:id"
            element={User ? <ChannelLayout /> : <Navigate to="/" />}
          />
          <Route path="/likedVideos/:id" element={<LikedLayout />} />
          <Route path="/history/:id" element={<AllHistoryLayout />} />
          <Route path="/yourVideos/:id" element={<YourvideoLayout />} />
          <Route path="/search" element={<SearchLayout />} />
        </Route>
        <Route path="/watch/:id" element={<ShowVideo />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
