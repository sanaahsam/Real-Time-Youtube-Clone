import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 } from "uuid";
import { UserContext } from "../../context/UserContext";
import "../CreateRoomBox/Room.css";
import { useReactMediaRecorder } from "react-media-recorder";
import { saveAs } from "file-saver";

function Room() {
  const { roomId } = useParams();
  const { User } = useContext(UserContext);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { screen: true }
  );
  const [shouldDownload, setShouldDownload] = useState(false);

  useEffect(() => {
    if (shouldDownload && mediaBlobUrl) {
      const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
      const fileName = `recording_${timestamp}.mp4`;
      fetch(mediaBlobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, fileName);
          setShouldDownload(false);
        })
        .catch((error) =>
          console.error("Error downloading the recording:", error)
        );
    }
  }, [shouldDownload, mediaBlobUrl]);

  const handleStopRecording = async () => {
    await stopRecording();
    setShouldDownload(true);
  };

  //using ZEgocloud to build a builtin Video Conference app

  async function meetingUI(element) {
    try {
      const appID = "Your_appID";
      const serverSecret = "your_serverSecre";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        v4(),
        `${User.name}`
      );

      const ui = ZegoUIKitPrebuilt.create(kitToken);

      await ui.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Personal link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomId,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="room-container">
      <div ref={meetingUI} style={{ width: "100%", height: "90vh" }}></div>

      <div className="recorder">
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={handleStopRecording}>Stop Recording</button>
      </div>
    </div>
  );
}

export default Room;
