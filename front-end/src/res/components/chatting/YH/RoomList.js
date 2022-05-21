import { Link } from "react-router-dom";
import React from "react";
function RoomList(props) {
  const { room } = props;

  return (
    <li className="animate__animated animate__bounce animate__repeat-1">
      <Link to="/chat/in" state={{ roomId: room.id }}>
        <h4>방번호:{room.id}</h4>
        <h5>제목 : {room.matchingPostName}</h5>
        <h5>현재인원 : {room.roomNumberOfPeople}</h5>
      </Link>
    </li>
  );
}

export default RoomList;
