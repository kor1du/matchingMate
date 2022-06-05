import React, { useEffect, useState } from 'react';
import Nav from "../../components/nav/Nav";
import {  Col, Row } from "react-bootstrap";
import ChatLeftSide from './ChatLeftSide'
import ChatRightSide from './ChatRightSide'
import { axiosGet } from '../../components/axios/Axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import axios from 'axios';
import { isLogin } from "../../components/login/Login";
import { redirectURL } from "../../components/url/CheckURL";



function Chat() {
  const [showMessage, setShowMessage] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [memberList, setMemberList] = useState("");
  const [roomHost, setRoomHost] = useState("");
  const [myId,setMyId]=useState("");
  const [myChattingMemberId, setMyChattingMemberId] = useState("");

  const [newMessage, setNewMessage] = useState(null);

  const [numberOfPeople, setNumberOfPeople] = useState(null);
  const [maxNumberOfPeople, setMaxNumberOfPeople] = useState(null);

  const [isCompleted, setIsCompleted] = useState(0);


  let sockJS = new SockJS("http://localhost:8080/stomp/chat");
  let stomp = Stomp.over(sockJS);

  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  // stomp.debug = null;

  useEffect(() => {
    if (!isLogin()) {
      //로그인한 상태가 아니라면
      const result = confirm("로그인이 필요합니다. 로그인하시겠습니까?");
      if (result === true) redirectURL("login");
      else redirectURL("");
    }
  })

  const chatStart = (roomId) => {
      
      setRoomId(roomId);
      
      const header = {
        Authorization: token,
      };

      axiosGet("/chat/in/" + roomId, header).then((res) => {
        console.log(res.data)
        setMyId(()=>res.data.data.myMemberId);
        setRoomHost(() => res.data.data.postMemberId);
        setMemberList(() => res.data.data.readMemberList);
        setMessages(() => res.data.data.readMessageList);
        setMyChattingMemberId(() => res.data.data.chattingMemberId);

        setNumberOfPeople(res.data.data.numberOfPeople);
        setMaxNumberOfPeople(res.data.data.maxNumberOfPeople);

        // setIsCompleted(res.data.data.isCompleted);
      });
  };

  function disconnectWS() {
    try {
      stomp.disconnect(() => stomp.unsubscribe("sub-0"), {
        Authorization: token,
      });
    } catch (error) {
      console.log(error);
    }
    
    axios.put(`http://localhost:8080/chat/out/${myChattingMemberId}`, "",{
      headers: {
        Authorization: token
      }
    }).then((res) => {7
      console.log(res);
    })
    // document.querySelector("#sendText").value = "";
    
  }

  
    
  return (
      <div>
          <Nav></Nav>

          <Row className="chatting">
              <Col xs="4">
                  <ChatLeftSide 
                    newMessage={newMessage} 
                    stomp={stomp} sockJS={sockJS} disconnectWS={disconnectWS} chatStart={chatStart}
                    numberOfPeople={numberOfPeople} maxNumberOfPeople={maxNumberOfPeople} 
                    myId={myId} 
                    myChattingMemberId={myChattingMemberId}
                    setIsCompleted={setIsCompleted} isCompleted={isCompleted} 
                    isDarkMode={isDarkMode} 
                    setRoomId={setRoomId} roomId={roomId} roomHost={roomHost} memberList={memberList} 
                    showMessage={showMessage} setShowMessage={setShowMessage}
                  />
              </Col>
              <Col xs="8">
                  <ChatRightSide 
                    setNewMessage={setNewMessage} newMessage={newMessage} 
                    isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} 
                    stomp={stomp} sockJS={sockJS} chatStart={chatStart} 
                    setMessages={setMessages}  messages={messages}
                    myId={myId} 
                    roomId={roomId} 
                    showMessage={showMessage} setShowMessage={setShowMessage}
                    setIsCompleted={setIsCompleted} 
                  />
              </Col>
          </Row>
      </div>
  );
}

export default Chat;
