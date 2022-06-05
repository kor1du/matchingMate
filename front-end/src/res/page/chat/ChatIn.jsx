import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosGet } from '../../components/axios/Axios';
import ChatInLeftSide from './ChatInLeftSide'
import ChatInRightSide from './ChatInRightSide'
import { Col, Row } from "react-bootstrap";
import Nav from "../../components/nav/Nav";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import axios from 'axios';

import './chattingList.css'

function ChatIn() {
    const state = useLocation().state;
    const navigate = useNavigate();
    
    const [isDarkMode, setIsDarkMode] = useState(state===null?false:state.isDarkMode);

    // eslint-disable-next-line no-unused-vars
    const [ roomId, setRoomId ] = useState(state.roomId);
    const [messages, setMessages] = useState([]);
    const [memberList, setMemberList] = useState("");
    const [roomHost, setRoomHost] = useState("");
    const [myId,setMyId]=useState("");
    const [myChattingMemberId, setMyChattingMemberId] = useState("");
    const [newMessage, setNewMessage] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(null);

    const [maxNumberOfPeople, setMaxNumberOfPeople] = useState(null);

    const [isCompleted, setIsCompleted] = useState(0);

    const token = "Bearer " + sessionStorage.getItem("jwtToken");

    const chatStart = () => {
        const header = {
          Authorization: token,
        };
  
        axiosGet("/chat/in/" + state.roomId, header).then((res) => {
          console.log(res.data)
          setMyId(()=>res.data.data.myMemberId);
          setRoomHost(() => res.data.data.postMemberId);
          setMemberList(() => res.data.data.readMemberList);
          setMessages(() => res.data.data.readMessageList);
          setMyChattingMemberId(() => res.data.data.chattingMemberId);
  
          setNumberOfPeople(res.data.data.numberOfPeople);
          setMaxNumberOfPeople(res.data.data.maxNumberOfPeople);
  
          setIsCompleted(res.data.data.isCompleted);
        }).catch((error) => {
          console.log(error);

          navigate("/chat", {replace:true}).then(() => {
            alert("강퇴당하였습니다.");
        });
          
          
        }) ;

    };



    let sockJS = new SockJS("http://localhost:8050/stomp/chat");
    let stomp = Stomp.over(sockJS);

    function connectWS() {
        stomp.connect({ Authorization: token }, () => {
          
          waitForConnection(stomp, function () {
            stomp.subscribe(
              "/sub/chat/in/" + roomId,
              (data) => {
                setNewMessage(() => JSON.parse(data.body).message);


                if (JSON.parse(data.body).sender === "server" && String(JSON.parse(data.body).message).substring(0, 7) === "매칭시간 : ") {
                  setIsCompleted(1);
                }


  
              },
              { Authorization: token }
            );
            stomp.send(
              "/pub/chat/enter",
              { Authorization: token },
              JSON.stringify({ roomId:roomId, token:token })
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
        
        axios.put(`http://localhost:8050/chat/out/${myChattingMemberId}`, "",{
          headers: {
            Authorization: token
          }
        }).then((res) => {7
          console.log(res);
        })
        
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


    // 입장
    // const enterRoom = () => {
    //     waitForConnection(stomp, function () {
    //       stomp.send(
    //         "/pub/chat/enter",
    //         { Authorization: token },
    //         JSON.stringify({ roomId:roomId, token:token })
    //       );
    //   });
    // }
    


    useEffect(() => {
        connectWS();
        chatStart();
    }, [newMessage])

    return (
        <div>
            <Nav></Nav>
            <div className="chatting">

            <Row>
                <Col xs="4">
                    <ChatInLeftSide 
                        numberOfPeople={numberOfPeople} maxNumberOfPeople={maxNumberOfPeople}
                        setIsCompleted={setIsCompleted} isCompleted={isCompleted}  
                        isDarkMode={isDarkMode}
                        memberList={memberList} 
                        disconnectWS={disconnectWS}
                        myChattingMemberId={myChattingMemberId}
                        myId={myId}
                        roomHost={roomHost}
                        stomp={stomp} sockJS={sockJS}
                        roomId={roomId}
                        newMessage={newMessage}
                    />
                </Col>
            
                <Col xs="8">
                    <ChatInRightSide 
                        messages={messages} 
                        isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} 
                        myId={myId}
                        roomId={roomId}
                        stomp={stomp} sockJS={sockJS}
                    />
                </Col>
            </Row>

            </div>
        </div>
    );
}

export default ChatIn;