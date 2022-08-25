import React from 'react';
import './MessageField.css';
function MessageField({user,userImage,message,timestamp}) {
    return (
        <div className="messageText">
            <img src={userImage} alt=""/>
            <div className="message_info">
                <h4>{user}{" "}
                <span className="timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span></h4>
                <p>{message}</p>
                
            </div>
        </div>
    )
}

export default MessageField
