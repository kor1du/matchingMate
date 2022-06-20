import React, { useState } from 'react';
import { Button } from "react-bootstrap";

function ChatSend(props) {
    const { roomId, stomp, sockJS } = props;

    const token = "Bearer " + sessionStorage.getItem("jwtToken");

    // eslint-disable-next-line no-unused-vars
    const [messageText, setMessageText] = useState("");

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

      waitForConnection(stomp, function () {
          
          stomp.send(
          "/pub/chat/message",
          { Authorization: token },
          JSON.stringify({ roomId: roomId, token: token, message: message })
          );
      });
      
      document.querySelector("#sendText").value = "";
  }

    return (
        <div>
            <input
            id="sendText"
            type="text"
            className='sendTextBox'
            onChange={(e) => {
              e.preventDefault();
              setMessageText(() => e.target.value);
            }}
          />  
            <Button
              type="submit"
              variant="success"
              className='sendButton'
              onClick={() => {
                sendMessage();
              }}
            >
              전송
            </Button>
        </div>
    );
}

export default ChatSend;