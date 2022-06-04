import React, {  } from 'react';
import ChatRoomList from './ChatRoomList'
import ChatMemberList from './ChatMemberList'

function ChatLeftSide(props) {
    const { newMessage, sockJS, stomp, maxNumberOfPeople, numberOfPeople, showMessage, myId, isCompleted, setIsCompleted, isDarkMode, setShowMessage, chatStart, memberList, setRoomId, roomId, roomHost, disconnectWS} = props;

    
    return (
        <div >
            { showMessage ? 
                <ChatMemberList setIsCompleted={setIsCompleted} newMessage={newMessage} sockJS={sockJS} stomp={stomp} maxNumberOfPeople={maxNumberOfPeople} numberOfPeople={numberOfPeople} myId={myId} isCompleted={isCompleted} isDarkMode={isDarkMode} disconnectWS={disconnectWS} roomId={roomId} roomHost={roomHost} memberList={memberList} setShowMessage={setShowMessage}/> :
                <ChatRoomList setIsCompleted={setIsCompleted} isDarkMode={isDarkMode} setRoomId={setRoomId} chatStart={chatStart} setShowMessage={setShowMessage}/>
            }
        </div>
    );
}

export default ChatLeftSide;