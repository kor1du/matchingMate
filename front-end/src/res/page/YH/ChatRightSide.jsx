import React, {} from 'react';
import ChatMessage from './ChatMessage'
import ChatNoMessage from './ChatNoMessage'

function ChatRightSide(props) {
    const { setIsDarkMode, isDarkMode, stomp, chatStart, sockJS, showMessage, roomId, messages, myId, sendMessage, setMessages} = props;


    return (
        <div className="rightSide">
            { showMessage ? 
                <ChatMessage setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} chatStart={chatStart} setMessages={setMessages} stomp={stomp} sockJS={sockJS} roomId={roomId} sendMessage={sendMessage} myId={myId} messages={messages}/> :
                <ChatNoMessage setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>
            }
        </div>
    );
}
export default ChatRightSide;