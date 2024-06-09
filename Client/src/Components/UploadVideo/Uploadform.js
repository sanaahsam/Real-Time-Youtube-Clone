import React, { useContext, useState } from "react";
import UploadVideo from "../UploadVideo/UploadVdeo";
import UploadThumbnail from "./UploadThumbnail";
import UploadVideoInfo from "./UploadInfo";
import "../UploadVideo/uploadvideo.css";
import { DrawerContext } from "../../context/DrawerContext";
import { UserContext } from "../../context/UserContext";
import { MdCancel } from "react-icons/md";

function UploadForm() {
  const { setUploadBox } = useContext(DrawerContext);
  const [page, setPage] = useState(0);
  const { User } = useContext(UserContext);
  const [Formdata, setFormData] = useState({
    title: "",
    description: "",
    selectedFile: null,
    selectedPic: null,
  });

  const cancel = () => {
    setUploadBox(false);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", Formdata.title);
    formData.append("description", Formdata.description);
    formData.append("uploader", User._id);
    formData.append("selectedFile", Formdata.selectedFile);
    formData.append("selectedPic", Formdata.selectedPic);

    try {
      console.log(formData);
      const res = await fetch(
        "https://mernclone-sana-ahsams-projects.vercel.app/Youtube/uploadvideo",
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.ok) {
        setUploadBox(false);
      }
      if (!res.ok) {
        const data = await res.json();
        console.log(data.error);
      } else {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const FormTitles = ["Upload Video", "Upload Thumbnail", "Upload Video Info"];

  const PageDisplay = () => {
    switch (page) {
      case 0:
        return <UploadVideo formData={Formdata} setFormData={setFormData} />;
      case 1:
        return (
          <UploadThumbnail formData={Formdata} setFormData={setFormData} />
        );
      case 2:
        return (
          <UploadVideoInfo formData={Formdata} setFormData={setFormData} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="form">
      <div className="form-head">
        <p>Upload Videos</p>
        <div className="cancel" onClick={cancel}>
          <MdCancel size={24} style={{ color: "white", cursor: "pointer" }} />
        </div>
      </div>
      <div className="progressbar">
        <div
          style={{
            width: `${(page + 1) * (100 / FormTitles.length)}%`,
          }}
        ></div>
      </div>
      <div className="form-container">
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            disabled={page === 0}
            onClick={() => setPage((currPage) => currPage - 1)}
          >
            Prev
          </button>
          <button
            onClick={() => {
              if (page === FormTitles.length - 1) {
                handleSubmit();
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
