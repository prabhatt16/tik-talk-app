import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "../screens/Chat.css";
import { useParams } from "react-router-dom";
import { AiOutlineStar, AiOutlineInfoCircle } from "react-icons/ai";
import ImageMessage from "../components/ImageMessage";
import MessageField from "../components/MessageField";
import ChatInput from "../components/ChatInput";

function SearchPage() {
  const { searchId } = useParams();
  const [details, setDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [imageMessage, setImageMessage] = useState([]);

  useEffect(() => {
    if (searchId) {
      db.collection("rooms")
        .doc(searchId)
        .onSnapshot((snapshot) => setDetails(snapshot.data()));
      db.collection("rooms")
        .doc(searchId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setRoomMessages(snapshot.docs.map((doc) => doc.data()))
        );
      // db.collection('rooms').doc(searchId).collection('images').orderBy("timestamp","asc").onSnapshot((snapshot)=>
      // setImageMessage(snapshot.docs.map((doc)=>doc.data())));
    } else {
      console.log("fail");
    }
  }, [searchId]);
  console.log(details);

  console.log("Messages >>", roomMessages);
  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_headerLeft">
          <h3 className="chat_channelName">
            <strong>#{details?.name}</strong>
            {/* <AiOutlineStar/> */}
          </h3>
        </div>
        <div className="chat_headerRight">
          <p>
            <AiOutlineInfoCircle />
            Details
          </p>
        </div>
      </div>
      <div className="chat__message">
        {roomMessages.map(({ message, user, userImage, imageUrl,timestamp, type }) => {
          if (type === "text") {
            return (
              <MessageField
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          } else if (type === "image") {
            return (
                <ImageMessage
                  imagePost={imageUrl}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              )
          }
        })}
        {/* {} */}
      </div>
      {details ? console.log(details) : console.log("details fail")}
      {searchId ? console.log(searchId) : console.log("room id fail")}
      <ChatInput channelName={details?.name} channelId={searchId} />
    </div>
  );
}

export default SearchPage;
