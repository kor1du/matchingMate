// // import React from 'react';
// import React, { useEffect, useState } from "react";
// import RoomList from "../../components/chatting/YH/RoomList";
// import { axiosGet } from "../../components/axios/Axios";
// // import Nav from "../../components/nav/Nav";
// import "../../css/chattingList/chattingList.css";


// function ChatRoomList(props) {
//   const { setIsCompleted, setShowMessage, chatStart, setRoomId, isDarkMode } = props;

//   const [rooms, setRooms] = useState([]);
//   // 채팅 목록
//   const getChattingList = () => {
//     const header = {
//       Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
//     };
    
//     axiosGet("/chat", header).then((res) => {
//       console.log(res.data.data);
//       setRooms(() => res.data.data);

//     });
//   };
//   // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
//   useEffect(() => {
//     getChattingList();
//   }, []);

//   function SetMode (props) {
//     const isDarkMode = props.isDarkMode;

//     if (isDarkMode) {
//       return (
//         <div className='chatting-list-darkMode'>
//           <ul className="chatting-list">
//             {rooms.map((room) => {
//               return <RoomList setIsCompleted={setIsCompleted} isDarkMode={isDarkMode} key={room.id} setRoomId={setRoomId} chatStart={chatStart} room={room} setShowMessage={setShowMessage}></RoomList>;
//             })}
//           </ul>
//         </div>
//       );

//     } else {
//       return (
//         <div className='chatting-list-ligthMode'>
//           <ul className="chatting-list">
//             {rooms.map((room) => {
//               return <RoomList setIsCompleted={setIsCompleted} isDarkMode={isDarkMode} key={room.id} setRoomId={setRoomId} chatStart={chatStart} room={room} setShowMessage={setShowMessage}></RoomList>;
//             })}
//           </ul>
//         </div>
//       );
//     }
//   }

//   return (
//     <>
//       <SetMode isDarkMode={isDarkMode}/>
//     </>
//   );
// }

// export default ChatRoomList;
