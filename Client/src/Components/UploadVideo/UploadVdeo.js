import React from "react";

function UploadVideo({ formData, setFormData }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("File selected, uploading...", file.name);
    setFormData({ ...formData, selectedFile: file });
  };

  return (
    <div className="upload-video">
      <img
        src="/picture/Screenshot 2024-04-27 235011.png"
        alt="uploadvideo-icon"
      />
      <span>Click on Select video file to select a video</span>
      <p>Your video will be private until you upload them</p>
      <label htmlFor="videoFileInput">SELECT FILE</label>
      <input
        type="file"
        id="videoFileInput"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
    </div>
  );
}

export default UploadVideo;
