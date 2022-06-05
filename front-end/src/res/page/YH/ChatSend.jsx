import React, { useState } from 'react';
import { Button } from "react-bootstrap";

function ChatSend(props) {
    const { sendMessage } = props;

    // eslint-disable-next-line no-unused-vars
    const [messageText, setMessageText] = useState("");

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