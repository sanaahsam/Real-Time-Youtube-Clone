import React, { useContext, useState } from "react";
import "../Channel/Createchannel.css";
import { DrawerContext } from "../../context/DrawerContext";
import { UserContext } from "../../context/UserContext";

const defaultImageSrc =
  "https://i1.sndcdn.com/avatars-000331957710-t1t88c-t240x240.jpg";

const CreateChannel = () => {
  const [previewImage, setPreviewImage] = useState(defaultImageSrc);
  const [imageFile, setImageFile] = useState(null); // Store image file
  const { setChannelBox } = useContext(DrawerContext);
  const { User, dispatch } = useContext(UserContext);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");

  // cancel button function
  const CloseBox = () => {
    setChannelBox(false);
  };

  // handle change function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImageFile(file); // Store the selected file
      };
      reader.readAsDataURL(file);
      console.log(imageFile);
    } else {
      setPreviewImage(defaultImageSrc);
      setImageFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Email", User.email);
    formData.append("Name", name);
    formData.append("Handle", handle);
    formData.append("Picture", imageFile);
    formData.append("Channel", true);

    try {
      const response = await fetch(
        "https://mernclone-6an5.onrender.com/create",
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        setHandle("");
        setPreviewImage(defaultImageSrc);
        setName("");
        setChannelBox(false);
        const data = await response.json();
        console.log(data);
        localStorage.setItem("YoutubeUser", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="createchannel-container">
      <p>How you'll appear</p>

      <div className="createchannel-subcontainer">
        <img src={previewImage} alt="Preview" />
        <label className="select-label" htmlFor="image-upload">
          Select Picture:
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <p>
          By clicking Create channel, you agree to
          <span> YouTube's Terms of Service</span>. Changes made to your name
          and profile picture are visible only on YouTube and not other Google
          services. <span>Learn more</span>
        </p>
      </div>
      <div className="btns">
        <p onClick={CloseBox}>Cancel</p>
        <p className="create-btn" onClick={handleSubmit}>
          Create channel
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;
