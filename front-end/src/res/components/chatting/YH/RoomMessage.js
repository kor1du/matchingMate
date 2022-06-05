import React, { useEffect, useRef } from "react";

function RoomMessage(props) {
  const { messages, setMessages, myId } = props;
  const scrollRef = useRef();

  function scrollDown() {
    scrollRef.current.scrollIntoView(false);
  }

  useEffect(() => {
    setTimeout(scrollDown);
  }, [messages]);
  return (
    <div>
      <div className="messageContainer">
        {messages.map((message) => {
          if (myId === message.memberId) {
            return (
              <div key={message.chattingMessageId} className="message-me">
                {/* <div className="profile">
                  <img src={message.profileImgAddress} alt="" />
                  <span>{message.nickname}</span>
                </div> */}
                <div className="message-text" ref={scrollRef}>
                  <span> {message.registerDatetime.split(" ")[1]}</span>
                  <span className="balloon">{message.message}</span>
                </div>
              </div>
            );
          } else {
            return (
              <div key={message.chattingMessageId} className="message">
                <div className="profile">
                  <img src={message.profileImgAddress} alt="" />
                  <span>{message.nickname}</span>
                </div>
                <div className="message-text" ref={scrollRef}>
                  <span className="balloon">{message.message}</span>
                  <span> {message.registerDatetime.split(" ")[1]}</span>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default RoomMessage;
