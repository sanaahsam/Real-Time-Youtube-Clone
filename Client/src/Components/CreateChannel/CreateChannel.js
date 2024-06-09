import React, { useContext, useState } from "react";
import "../CreateChannel/CreateChannel.css";
import { UserContext } from "../../context/UserContext";

function CreateChannel() {
  const { user, dispatch, setshowChannelBox } = useContext(UserContext);

  //default profile pic
  const pfp =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0b4c759-ad9c-4425-a9f4-ab89e2fd9837/de8cefl-35c0bc59-59b9-42ab-b19f-5c73828bb78e.png/v1/fill/w_512,h_512,q_80,strp/blank_youtube_profile_pic_by_redballbomb_de8cefl-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvYjBiNGM3NTktYWQ5Yy00NDI1LWE5ZjQtYWI4OWUyZmQ5ODM3XC9kZThjZWZsLTM1YzBiYzU5LTU5YjktNDJhYi1iMTlmLTVjNzM4MjhiYjc4ZS5wbmciLCJ3aWR0aCI6Ijw9NTEyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.hqiBNaqF1Cgdy2pNAPbUiUMF-KUtVBZkYsEKoxF3Dxc";

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(pfp);
  const [Name, setName] = useState("");
  const [Handle, setHandle] = useState("");

  // State to keep track of the selected file and its preview URL

  // Function to handle cancellation of channel creation
  const handleCancel = () => {
    setshowChannelBox(false);
  };

  const email = user.email;
  //handle create channel

  const handleCreateChannel = async () => {
    const formData = new FormData();
    formData.append("Email", email);
    formData.append("Name", Name);
    formData.append("Handle", Handle);
    formData.append("Channel", true);
    formData.append("Picture", selectedFile);

    try {
      const response = await fetch("https://mernclone-sana-ahsams-projects.vercel.app/create", {
        method: "PUT",

        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log(data.err);
      }

      if (response.ok) {
        // Channel created successfully

        // Update local storage
        localStorage.setItem("youtubeUser", JSON.stringify(data));

        // Update UserContext immediately
        dispatch({ type: "LOGIN", payload: data });

        // Reset form fields and preview URL
        setHandle("");
        setName("");
        setPreviewUrl(pfp);

        // Hide the channel creation box
        setshowChannelBox(false);

        console.log("Channel created successfully.");
        return;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    const url = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(url);

    console.log("File selected, uploading...", file.name);
  };

  return (
    <div className="createChannel-container">
      <h2>How you'll appear</h2>
      <div className="createChannel-sub_container">
        {/*- profile pic - */}
        {previewUrl && (
          <img src={previewUrl} alt="Selected" className="preview-image" />
        )}

        {/* label  */}
        <label htmlFor="pictureInput" className="pic-input-label">
          {previewUrl === pfp ? "Select Picture" : "Change Picture"}
        </label>
        <input
          type="file"
          id="pictureInput"
          className="pic-input"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <label className="label-name" htmlFor="name">
          Name
        </label>
        <input
          className="inputs"
          id="name"
          style={{ paddingLeft: "10px" }}
          onChange={(e) => setName(e.target.value)}
          value={Name}
        />

        <label className="label-handle" htmlFor="handle">
          Handle
        </label>
        <label className="label-at" htmlFor="handle">
          @
        </label>
        <input
          className="inputs"
          id="handle"
          style={{ paddingLeft: "26px" }}
          value={Handle}
          onChange={(e) => setHandle(e.target.value)}
        />

        <p>
          By clicking Create channel, you agree to
          <span>YouTube's Terms of Service</span>. Changes made to your name and
          your profile picture are visible only on YouTube and other Google
          services. <span>Learn more</span>
        </p>
      </div>

      <div className="createChannel-btns">
        <p onClick={handleCancel}>Cancel</p>
        <p onClick={handleCreateChannel}>Create channel</p>
      </div>
    </div>
  );
}

export default CreateChannel;
