import React, {  } from 'react';
import ChatRoomList from './ChatRoomList'
import ChatMemberList from './ChatMemberList'

function ChatLeftSide(props) {
    const {showMessage, myId, isCompleted, setIsCompleted, isDarkMode, setShowMessage, chatStart, memberList, setRoomId, roomId, roomHost, disconnectWS} = props;
    
    return (
        <div >
            { showMessage ? 
                <ChatMemberList myId={myId} isCompleted={isCompleted} isDarkMode={isDarkMode} disconnectWS={disconnectWS} roomId={roomId} roomHost={roomHost} memberList={memberList} setShowMessage={setShowMessage}/> :
                <ChatRoomList setIsCompleted={setIsCompleted} isDarkMode={isDarkMode} setRoomId={setRoomId} chatStart={chatStart} setShowMessage={setShowMessage}/>
            }
        </div>
    );
}

export default ChatLeftSide;