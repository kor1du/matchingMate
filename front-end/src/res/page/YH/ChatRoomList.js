// import React from 'react';
import React, { useEffect, useState } from "react";
import RoomList from "../../components/chatting/YH/RoomList";
import { axiosGet } from "../../components/axios/Axios";
import Nav from "../../components/nav/Nav";
import "../../css/chattingList/chattingList.css";

function ChatRoomList() {
  const [rooms, setRooms] = useState([]);

  // 채팅 목록
  const getChattingList = () => {
    const header = {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    };
    axiosGet("/chat", header).then((res) => {
      setRooms(() => res.data.data);
    });
  };

  console.log(rooms);
  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  useEffect(() => {
    getChattingList();
  }, []);

  return (
    <>
      <Nav></Nav>
      <ul className="chatting-list">
        {rooms.map((room) => {
          return <RoomList key={room.id} room={room}></RoomList>;
        })}
      </ul>
    </>
  );
}

export default ChatRoomList;
