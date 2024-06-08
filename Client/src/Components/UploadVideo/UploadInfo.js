import React from "react";

function UploadVideoInfo({ formData, setFormData }) {
  return (
    <div className="upload-details">
      <p>Details</p>
      <input
        placeholder="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
    </div>
  );
}

export default UploadVideoInfo;
