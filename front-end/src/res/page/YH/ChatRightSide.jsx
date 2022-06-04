import React, {} from 'react';
import ChatMessage from './ChatMessage'
import ChatNoMessage from './ChatNoMessage'

function ChatRightSide(props) {
    const { setIsCompleted, setNewMessage, newMessage, setIsDarkMode, isDarkMode, stomp, chatStart, sockJS, showMessage, roomId, messages, myId} = props;


    return (
        <div className="rightSide">
            { showMessage ? 
                <ChatMessage setIsCompleted={setIsCompleted} setNewMessage={setNewMessage} newMessage={newMessage} setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} chatStart={chatStart}  stomp={stomp} sockJS={sockJS} roomId={roomId}  myId={myId} messages={messages}/> :
                <ChatNoMessage setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>
            }
        </div>
    );
}
export default ChatRightSide;