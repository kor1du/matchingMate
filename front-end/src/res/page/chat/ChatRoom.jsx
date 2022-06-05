import React, { useEffect, useState } from 'react';
import ChatLeftSide from "./ChatLeftSide";
import ChatRightSide from "./ChatRightSide";
import { Col, Row } from "react-bootstrap";
import Nav from "../../components/nav/Nav";
import { axiosGet } from '../../components/axios/Axios';

function ChatRoom() {
    const [isDarkMode, setIsDarkMode]  = useState(false);

    const [rooms, setRooms] = useState([]);

    const getChattingList = () => {
        const header = {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        };
        
        axiosGet("/chat", header).then((res) => {
        console.log(res.data.data);
        setRooms(() => res.data.data);

        });
    };

    useEffect(() => {
        getChattingList();
    }, []);

    return (
    <div>
        <Nav></Nav>
        
        <div className="chatting">


        <Row>
            <Col xs="4">
                <ChatLeftSide rooms={rooms} isDarkMode={isDarkMode} />
            </Col>
            
            <Col xs="8">
                <ChatRightSide setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
            </Col>
        </Row>
        </div>
    </div>
    );
}

export default ChatRoom;