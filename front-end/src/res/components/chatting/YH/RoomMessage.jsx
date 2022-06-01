import React, { useEffect, useRef } from "react";
import MessageItem from './MessageItem'

function RoomMessage(props) {
  // eslint-disable-next-line no-unused-vars
  const { messages, myId, isDarkMode } = props;

  const scrollRef = useRef();

  function scrollDown() {
      scrollRef.current.scrollIntoView();
  }

  const SetMode = () => {
    if (isDarkMode) {
      
      return (
        <div className="messageContainer-dark">
          <div className="messageContainer" >
            { messages.map((message) => 
              <MessageItem  key={message.chattingMessageId} message={message} isDarkMode={isDarkMode} scrollRef={scrollRef}  myId={myId}/>
             ) }
          </div>
        </div>
      );
  
    } else {
      return (
        <div className="messageContainer-ligth">
          
          <div className="messageContainer" >
          
            { messages.map((message) => 
              <MessageItem key={message.chattingMessageId} message={message} isDarkMode={isDarkMode} scrollRef={scrollRef} myId={myId}/>              
            )}
          </div>
        </div>
      );
    }
  
  }
  
  useEffect(() => {
    setTimeout(scrollDown);
    
  }, [messages]);

  
  return (
    <div >
      <SetMode  />
    </div>
  );
}

export default RoomMessage;
