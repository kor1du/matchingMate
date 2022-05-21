import React from "react";

function RoomMessage(props) {
  const { messages, memberId, roomId } = props;

  return (
    <div>
      <div className="MessagesContainer">
        {messages.map((message) => {
          return (
            <div
              className="MessagesContainerMine"
              key={message.chattingMessageId}
            >
              <p>memberId : {message.memberId}</p>
              <p>message : {message.message}</p>
              <p>{message.registerDatetime}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoomMessage;
