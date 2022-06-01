// import { Link } from "react-router-dom";
import React from "react";
function RoomList(props) {
  const { setIsCompleted, room, chatStart, setShowMessage, setRoomId, isDarkMode } = props;
  
  function SetMode (props) {
    const isDarkMode = props.isDarkMode;

    if (isDarkMode) {
      return (
          <li className="hvr-sweep-to-right-darkMode">
            <div onClick={() => {setShowMessage(true); setIsCompleted(room.isCompleted); setRoomId(room.id); chatStart(room.id); }} state={{ roomId: room.id }}>
              <div className="isCompletedContainer">
                <h5 className="isCompleted">{ room.isCompleted==1? "모집완료": "모집중"}</h5>
                
                  { room.noReadChatCount==0 ? null : 
                    <div className="noReadChatCountContainer">
                      <span className="noReadChatCount">{room.noReadChatCount}</span> 
                    </div>
                    }
                
              </div>
              <h5>공고 : { room.matchingPostName === null ? "현재 존재하지 않는 공고입니다." : room.matchingPostName}</h5>
              <h5>현재인원 : {room.roomNumberOfPeople}</h5>
            </div>
          </li>
      );

    } else {
      return (
          <li className="hvr-sweep-to-right-lightMode">
            <div onClick={() => {setShowMessage(true); setIsCompleted(room.isCompleted); setRoomId(room.id); chatStart(room.id); }} state={{ roomId: room.id }}>
              <div className="isCompletedContainer">
                <h5 className="isCompleted">{ room.isCompleted==1? "모집완료": "모집중"}</h5>
                { room.noReadChatCount==0 ? null : 
                    <div className="noReadChatCountContainer">
                      <span className="noReadChatCount">{room.noReadChatCount}</span> 
                    </div>
                    }
              </div>
              <h5>공고 : { room.matchingPostName === null ? "현재 존재하지 않는 공고입니다." : room.matchingPostName}</h5>
              <h5>현재인원 : {room.roomNumberOfPeople}</h5>              
            </div>
          </li>
      );
    }

  }

  return (
    <SetMode isDarkMode={isDarkMode}/>
  
  );
}

export default RoomList;
