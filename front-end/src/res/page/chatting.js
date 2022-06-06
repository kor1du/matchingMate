import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChattingRightside from "../components/chatting/ChattingRightside";
import ChattingLeftside from "../components/chatting/ChattingLeftside";
import NavChatting from "../components/nav/NavChatting";

export default function Chat() {
  return (
    <Container>
      <NavChatting></NavChatting>
      <div className="chatting">
        <Row>
          <Col xs="4" className="chatting-left-side">
            <ChattingLeftside></ChattingLeftside>
          </Col>
          <Col xs="8" className="chatting-right-side">
            <ChattingRightside></ChattingRightside>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
