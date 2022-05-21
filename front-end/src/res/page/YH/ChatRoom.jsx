import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import sockjs from "sockjs-client";
import stomp from "stompjs";
import RoomMessage from "../../components/chatting/YH/RoomMessage";
import ChattingMemberList from "../../components/chatting/YH/ChattingMemberList";

import { axiosGet } from "../../components/axios/Axios";

function ChatRoom() {
  let sockJS = new sockjs("http://localhost:8080/stomp/chat");
  let Stomp = stomp.over(sockJS);
  Stomp.debug = null;

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [memberList, setMemberList] = useState("");
  const [roomHost, setRoomHost] = useState("");
  const scrollRef = useRef();

  function scrollDown() {
    scrollRef.current.scrollIntoView(false);
  }

  const roomId = Number(useLocation().state.roomId);

  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const getRoomInfo = () => {
    const header = {
      Authorization: token,
    };
    axiosGet("/chat/in/" + roomId, header).then((res) => {
      setRoomHost(() => res.data.data.postMemberId);
      setMemberList(() => res.data.data.readMemberList);
      setMessages(() => res.data.data.readMessageList);
    });
  };

  useEffect(() => {
    connectWS();
    getRoomInfo();
    // setTimeout(scrollDown, 300);
  }, [newMessage]);
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
  }

  return (
    <div>
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
      <button type="submit" onClick={() => disconnectWS}>
        <Link to="/chat/">나가기 </Link>
      </button>
      <div>
        <RoomMessage messages={messages} roomId={roomId} />
      </div>

      <div ref={scrollRef}>
        <span>내용 :</span>
        <input
          id="sendText"
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setMessageText(() => e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            sendMessage();
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
