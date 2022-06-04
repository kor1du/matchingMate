// import React from 'react';
import React, { useEffect, useState } from "react";
import RoomList from "../../components/chatting/YH/RoomList";
import { axiosGet } from "../../components/axios/Axios";
// import Nav from "../../components/nav/Nav";
import "../../css/chattingList/chattingList.css";


function ChatRoomList(props) {
  const { setIsCompleted, setShowMessage, chatStart, setRoomId, isDarkMode } = props;

// const useInterval = (callback, delay) => {
//   const [savedCallback, setSavedCallback] = useState(null) // useState사용

//   // callback이 바뀔 때마다 실행
//   // 첫 실행에 callback이 한 번 들어옴 -> 리렌더링 -> 다시 들어옴 -> 리렌더링 -> .. 무한 반복
//   // 원래의 의도는 callback이 새로 들어오면 그 callback을 저장해두고 아래의 setInterval을 다시 실행해주려는 의도
//   useEffect(() => {
//     setSavedCallback(callback);
//   }, [callback]);
  
//   // mount가 끝나고 1번 일어남
//   // 맨 처음 mount가 끝나고 savedCallback은 null이기 때문에 setInterval의 executeCallback이 제대로 실행되지 않음 (null이기 때문에)
//   useEffect(() => {
//     // console.log(savedCallback());
//     const executeCallback = () => {
//       savedCallback();
//     };

//     const timerId = setInterval(executeCallback, delay);

//     return () => clearInterval(timerId);
//   }, []);
// };

// useInterval(() => {
//   getChattingList();
//   }, 60000);

  const [rooms, setRooms] = useState([]);
  // 채팅 목록
  const getChattingList = () => {
    const header = {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    };
    axiosGet("/chat", header).then((res) => {
      console.log(res.data.data);
      setRooms(() => res.data.data);

    });
  };
  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  useEffect(() => {
    getChattingList();
  }, []);

  function SetMode (props) {
    const isDarkMode = props.isDarkMode;

    if (isDarkMode) {
      return (
        <div className='chatting-list-darkMode'>
          <ul className="chatting-list">
            {rooms.map((room) => {
              return <RoomList setIsCompleted={setIsCompleted} isDarkMode={isDarkMode} key={room.id} setRoomId={setRoomId} chatStart={chatStart} room={room} setShowMessage={setShowMessage}></RoomList>;
            })}
          </ul>
        </div>
      );

    } else {
      return (
        <div className='chatting-list-ligthMode'>
          <ul className="chatting-list">
            {rooms.map((room) => {
              return <RoomList setIsCompleted={setIsCompleted} isDarkMode={isDarkMode} key={room.id} setRoomId={setRoomId} chatStart={chatStart} room={room} setShowMessage={setShowMessage}></RoomList>;
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

export default ChatRoomList;
