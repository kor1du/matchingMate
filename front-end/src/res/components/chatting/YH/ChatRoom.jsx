import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import sockjs from "sockjs-client";
import stomp from "stompjs";
import RoomMessage from "../../components/chatting/YH/RoomMessage";
import ChattingMemberList from "../../components/chatting/YH/ChattingMemberList";
import "../../css/chatting/chattingLeftside.css";
import "../../css/chatting/chattingRightside.css";
import "../../css/chatting/chatting.css";
import axios from 'axios';
import { axiosGet } from "../../components/axios/Axios";
import { Button, Col, Row } from "react-bootstrap";

//j7
function ChatRoom() {
  let sockJS = new sockjs("http://kor1du.gonetis.com:8080/stomp/chat");
  let Stomp = stomp.over(sockJS);
  Stomp.debug = null;

  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [messageText, setMessageText] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [memberList, setMemberList] = useState("");
  const [roomHost, setRoomHost] = useState("");
  const [myId,setMyId]=useState("");

  const [myChattingMemberId, setMyChattingMemberId] = useState("");

  const roomId = Number(useLocation().state.roomId);

  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const getRoomInfo = () => {
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

  useEffect(() => {
    connectWS();
    getRoomInfo();
  }, [newMessage]);
  if (memberList.length > 0) {
    memberList.sort(function (a, b) {
      return a.priority > b.priority ? -1 : a.priority < b.priority ? 1 : 0;
    });
  }
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (sockJS.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(stomp, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }
  function sendMessage() {
    let message = document.querySelector("#sendText").value;
    waitForConnection(Stomp, function () {
      Stomp.send(
        "/pub/chat/message",
        { Authorization: token },
        JSON.stringify({ roomId: roomId, token: token, message: message })
      );
    });
    document.querySelector("#sendText").value = "";
  }

  function connectWS() {
    Stomp.connect({ Authorization: token }, () => {
      waitForConnection(stomp, function () {
        Stomp.subscribe(
          "/sub/chat/in/" + roomId,
          (data) => {
            setNewMessage(() => JSON.parse(data.body).message);
          },
          { Authorization: token }
        );
      });
    });
  }

  function disconnectWS() {
    try {
      stomp.disconnect(() => stomp.unsubscribe("sub-0"), {
        Authorization: token,
      });
    } catch (error) {
      console.log(error);
    }
    
    axios.put(`http://kor1du.gonetis.com:8080/chat/out/${myChattingMemberId}`, "",{
      headers: {
        Authorization: token
      }
    }).then((res) => {
      console.log(res);
    })
  }
  return (
    <>
      <Nav></Nav>
      <Row className="chatting">
        <Col xs="4">
          <div className="chatting-left-side">
            <div className="btn-exit-div">
              <Button
                className="btn-exit"
                variant="danger"
                type="submit"
                onClick={() => {disconnectWS()}}
              >
                <Link to="/chat/">
                  <p>나가기</p>
                </Link>
              </Button>
            </div>
            <div className="chatting-member-list">
              {memberList.length > 0
                ? memberList.map((member) => {
                    return (
                      <ChattingMemberList
                        key={member.memberId}
                        roomId={roomId}
                        roomHost={roomHost}
                        member={member}
                      ></ChattingMemberList>
                    );
                  })
                : null}
            </div>
          </div>
        </Col>
        <Col xs="8">
          <div className="chatting-right-side">
            <div>
              <RoomMessage messages={messages} setMessages={setMessages} myId={myId}/>
            </div>
            <div></div>
            <div className="btn-send">
              <input
                id="sendText"
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setMessageText(() => e.target.value);
                }}
              />
              <Button
                type="submit"
                variant="success"
                onClick={() => {
                  sendMessage();
                }}
              >
                전송
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ChatRoom;
