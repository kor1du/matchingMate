import React, { useEffect, useState } from 'react';
import ChatLeftSide from "./ChatLeftSide";
import ChatRightSide from "./ChatRightSide";
import { Col, Row } from "react-bootstrap";
import Nav from "../../components/Nav/Nav";
import { axiosGet } from '../../components/axios/Axios';
import { useLocation } from 'react-router-dom';



function ChatRoom() {
    const state = useLocation().state;

    const [isDarkMode, setIsDarkMode] = useState(state===null?false:state.isDarkMode);

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
    }, [useLocation()]);

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