import React, { useState } from "react";
import "../ShowVideo/comment.css";
import { BiLike, BiDislike } from "react-icons/bi";

function Comment(prop) {
  const [expanded, setExpanded] = useState(false);

  const toggleContent = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="comment-container">
      <img
        src={`https://mernclone-6an5.onrender.com/${prop.data.userPfp}`}
        alt="otheruser-pfp"
      />
      <div className="comment-subcontainer">
        <p className="cmt-handle">{prop.data.handle}</p>
        <p
          className="cmt"
          style={{
            maxHeight: expanded ? "none" : "3em",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {prop.data.content}
        </p>
        {!expanded && (
          <p className="toggle-btn" onClick={toggleContent}>
            Read more...
          </p>
        )}
        {expanded && (
          <p className="toggle-btn" onClick={toggleContent}>
            Read less...
          </p>
        )}
        <div className="cmt-btns">
          <BiLike size={25} />

          <BiDislike size={25} />
          <p>Reply</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
