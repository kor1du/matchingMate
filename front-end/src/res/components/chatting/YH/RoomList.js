// import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
// import DeleteIcon from '@mui/icons-material/Delete';
// import { axiosDelete } from "../../axios/Axios";

function RoomList(props) {
  const { room,  isDarkMode } = props;
  const navigate = useNavigate();

  // const deleteRoom = () => {
  //   axiosDelete("/chat/out");
  // }

  function SetMode (props) {
    const isDarkMode = props.isDarkMode;


    if (isDarkMode) {
      return (
          <li className="hvr-sweep-to-right-darkMode">
            {/* <div className="delete-icon-container">
              <DeleteIcon onClick={() => { deleteRoom(); }}/>
            </div> */}
            
            <div onClick={() => {
              navigate("/newChat/in/"+room.id,
                {state:{isDarkMode:isDarkMode, roomId:room.id}}
              )
            }}>
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
            {/* <div className="delete-icon-container">
              <DeleteIcon onClick={() => { deleteRoom(); }}/>
            </div> */}
            
            {/* <Link to={{pathname:"/newChat/in/"+room.id, state:{data:isDarkMode}}} > */}
            <div onClick={() => {
              navigate("/newChat/in/"+room.id,
                {state:{isDarkMode:isDarkMode, roomId:room.id}}
              )
            }}>
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
              {/* </Link> */}
          
            
          </li>
      );
    }

  }

  return (
    <SetMode isDarkMode={isDarkMode}/>
  
  );
}

export default RoomList;
