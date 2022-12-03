import React from "react";
import "../components/ImageMessage.css";
import { FcLike } from "react-icons/fc";

function ImageMessage({ user, userImage, imagePost, timestamp }) {
  return (
    <div className="message">
      <div className="userPic">
        <img src={userImage} alt="pic" />
      </div>
      <div className="messageArea">
        <div className="message-info">
          <h4>
            {user}{" "}
            <span className="timestamp">
              {new Date(timestamp?.toDate()).toUTCString()}
            </span>
          </h4>
        </div>
        <div className="postArea">
          <img src={imagePost} alt="postImage" />
        </div>
      </div>
    </div>
  );
}
export default ImageMessage;
