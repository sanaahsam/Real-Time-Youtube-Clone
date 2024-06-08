import React, { useState } from "react";

function UploadThumbnail({ formData, setFormData }) {
  const defaultImageSrc =
    "https://i1.sndcdn.com/avatars-000331957710-t1t88c-t240x240.jpg";

  const [previewImage, setPreviewImage] = useState(defaultImageSrc);

  const handleThumbnailSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        console.log("File selected, uploading...", file.name);
        setFormData({ ...formData, selectedPic: file });
      };
      reader.readAsDataURL(file); // Add this line to read the file content
    }
  };

  return (
    <div className="thumbnail-container">
      <img src={previewImage} alt="thumbnail" />
      <label htmlFor="inputThumbnail" className="thumbnail-input-label">
        Select Thumbnail Picture
      </label>
      <input
        style={{ display: "none" }}
        type="file"
        id="inputThumbnail"
        className="thumbnail-input"
        accept="image/*"
        onChange={handleThumbnailSelect}
      />
    </div>
  );
}

export default UploadThumbnail;
