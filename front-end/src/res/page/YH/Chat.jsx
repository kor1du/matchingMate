import React, { useState } from 'react';
import Nav from "../../components/nav/Nav";
import {  Col, Row } from "react-bootstrap";
import ChatLeftSide from './ChatLeftSide'
import ChatRightSide from './ChatRightSide'
import { axiosGet } from '../../components/axios/Axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import axios from 'axios';


function Chat() {
  const [showMessage, setShowMessage] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [roomId, setRoomId] = useState(null);

  const [messages, setMessages] = useState([]);
  
 
  const [memberList, setMemberList] = useState("");
  const [roomHost, setRoomHost] = useState("");
  const [myId,setMyId]=useState("");
  const [myChattingMemberId, setMyChattingMemberId] = useState("");

  const [isCompleted, setIsCompleted] = useState(0);

  let sockJS = new SockJS("http://localhost:8080/stomp/chat");
  let stomp = Stomp.over(sockJS);

  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  stomp.debug = null;

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
  }

    
  return (
      <div>
          <Nav></Nav>

          <Row className="chatting">
              <Col xs="4">
                  <ChatLeftSide myId={myId} setIsCompleted={setIsCompleted} isCompleted={isCompleted} isDarkMode={isDarkMode} disconnectWS={disconnectWS} setRoomId={setRoomId} roomId={roomId} roomHost={roomHost} memberList={memberList} chatStart={chatStart} showMessage={showMessage} setShowMessage={setShowMessage}/>
              </Col>
              <Col xs="8">
                  <ChatRightSide isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} chatStart={chatStart} setMessages={setMessages}  messages={messages}  stomp={stomp} sockJS={sockJS} myId={myId}roomId={roomId} setRoomId={setRoomId} showMessage={showMessage} setShowMessage={setShowMessage}/>
              </Col>
          </Row>
      </div>
  );
}

export default Chat;
