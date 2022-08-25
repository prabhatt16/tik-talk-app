import { Button, makeStyles, Modal } from "@material-ui/core";
import React, { useState } from "react";

import { auth, db, storage } from "./firebase";
import { BiImage, BiSend } from "react-icons/bi";
import "./ChatInput.css";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function ChatInput({ channelName, channelId }) {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const [image, setImage] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    // if (e.target.files.length) {
    //   console.log(e.target.files);
    //   setImage({
    //     raw: e.target.files[0],
    //   });
    // } else console.log('upload img');
    const image = e.target.files[0];
    setImage((imageFile) => image);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (image === "") {
      console.error(`not an image, the image file is a ${typeof image}`);
    }
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      async (e) => {
        await storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl({ imgUrl: fireBaseUrl });
            if (channelId) {
              db.collection("rooms").doc(channelId).collection("messages").add({
                imageUrl: fireBaseUrl,
                userImage: user.photoURL,
                type: "image",
                user: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            } else {
              alert(e.message);
            }
            setImage(null);
            handleClose();
          })
          .catch((error) => console.log(error));
      }
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (channelId && input != "") {
      await db
        .collection("rooms")
        .doc(channelId)
        .collection("messages")
        .add({
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.displayName,
          type: "text",
          userImage: user.photoURL,
        })
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          alert(e.message);
        });
    } else {
      alert(
        "your message is empty :/, if not may be data base error(try again)"
      );
    }
    setInput("");
  };

  const body = (
    <div className="img-container">
      <input type="file" onChange={handleChange} />
      <Button
        color="primary"
        type="submit"
        variant="contained"
        onClick={handleUpload}
        className="upload-btn"
      >
        upload
      </Button>
    </div>
  );
  return (
    <>
      {/* <div className='chatInput'>
            <form>
                <input placeholder={`message #${channelName}`} onChange={(e)=>setInput(e.target.value)} type="text" value={input} />
                <button type="submit" onClick={sendMessage}>send</button>
            </form>
        </div> */}

      <div className="input-field">
        <input
          placeholder={`message #${channelName}`}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
        <div className="btn_item">
          <BiImage
            style={{
              height: "25px",
              width: "25px",
              color: "blueviolet",
              marginLeft: "8px",
            }}
            onClick={handleOpen}
          />
          <BiSend
            onClick={sendMessage}
            style={{
              height: "25px",
              width: "25px",
              color: "blueviolet",
              marginLeft: "8px",
            }}
            className="banner-icon"
            autoFocus={true}
          />
        </div>
      </div>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        {body}
      </Modal>
    </>
  );
}

export default ChatInput;
