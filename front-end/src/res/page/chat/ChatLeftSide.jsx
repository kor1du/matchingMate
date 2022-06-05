import React, {  } from 'react';
import RoomList from '../../components/chatting/YH/RoomList';

function ChatLeftSide(props) {
    const { isDarkMode, rooms } = props;

    function SetMode (props) {
        const isDarkMode = props.isDarkMode;
    
        if (isDarkMode) {
          return (
            <div className='chatting-list-darkMode'>
              <ul className="chatting-list">
                {rooms.map((room) => {
                  return <RoomList key={room.id} isDarkMode={isDarkMode} room={room} />;
                })}
              </ul>
            </div>
          );
    
        } else {
          return (
            <div className='chatting-list-ligthMode'>
              <ul className="chatting-list">
                {rooms.map((room) => {
                  return <RoomList key={room.id} isDarkMode={isDarkMode} room={room} />;
                })}
              </ul>
            </div>
          );
        }
      }
    
      return (
        <>
          <SetMode isDarkMode={isDarkMode}/>
        </>
      );
}

export default ChatLeftSide;