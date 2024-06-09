import React, { useContext, useState } from "react";
import "../ShowVideo/commentsection.css";
import Comment from "./Comment";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://mernclone-6an5.onrender.com");

function CommentSection({ cmts }) {
  const [showbtn, setShowbtn] = useState(false);
  const { User } = useContext(UserContext);
  const [contents, setContent] = useState("");
  const { id } = useParams();

  const userID = User ? User._id : "";

  const cmt = cmts.length > 0 ? "Comments" : "Comment";

  const clicked = () => {
    setShowbtn(true);
  };

  const cancel = () => {
    setShowbtn(false);
  };

  //post commment

  const postComment = async () => {
    try {
      const res = await fetch(
        `https://mernclone-6an5.onrender.com/Youtube/cmt/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID, contents }),
        }
      );
      const data = await res.json();
      socket.emit("newComment", data);

      if (res.ok) {
        setContent("");
        setShowbtn(false);
      }
      if (!res.ok) {
        console.log(data.err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="cmtsection-container">
      <p className="total-cmt">{`${cmts.length} ${cmt}`}</p>

      {/* add comment ----- */}
      {User && User.ischannel ? (
        <div className="add-cmt">
          <div className="addcmt-subcontainer">
            <img
              src={`https://mernclone-6an5.onrender.com/${User.profile}`}
              alt="user-pfp"
            />
            <input
              placeholder="Add a comment..."
              onClick={clicked}
              value={contents}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
          <div
            className="addcmt-btn"
            style={{ display: showbtn ? "flex" : "none" }}
          >
            <div className="cancel" onClick={cancel}>
              Cancel
            </div>
            <div className="okadd" onClick={postComment}>
              Comment
            </div>
          </div>
        </div>
      ) : (
        <div
          className="addcmt"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          Signup to comment
        </div>
      )}

      {/* ---- cmtsection-subcontainer */}

      <div className="cmtsection-subcontainer">
        {cmts.map((m) => {
          return <Comment key={m._id} data={m} />;
        })}
      </div>
    </div>
  );
}

export default CommentSection;
