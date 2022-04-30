import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileComponent from "./Profile";
import "../../css/nav/navChatting.css";
import Bars from "../../img/bars-solid.png";
import NavLeftSide from "./NavLeftSide";

const showLeft = (event) => {
  event.preventDefault();
  const navLeftside = document.querySelector(".nav-left-side");
  navLeftside.classList.toggle("active");
};

const showChattingLeft = (event) => {
  const chattingLeftside = document.querySelector(".chatting-left-side");
  event.preventDefault();
  disableChattingRight(event);
  chattingLeftside.classList.toggle("active");
};

const disableChattingRight = (event) => {
  event.preventDefault();
  const chattingRightside = document.querySelector(".chatting-right-side");
  chattingRightside.classList.toggle("active");
};

const disableChattingLeftByWindowResize = (event) => {
  event.preventDefault();
  const windowWidth = document.documentElement.clientWidth;
  const chattingLeftside = document.querySelector(".chatting-left-side");
  const chattingRightside = document.querySelector(".chatting-right-side");
  if (
    windowWidth > 1023 &&
    chattingLeftside.classList.contains("active") &&
    chattingRightside.classList.contains("active")
  ) {
    chattingLeftside.classList.toggle("active");
    chattingRightside.classList.toggle("active");
  }
};

export default function navChatting() {
  useEffect(() => {
    window.addEventListener("resize", disableChattingLeftByWindowResize);
    return () => {
      window.removeEventListener("resize", disableChattingLeftByWindowResize);
    };
  });

  return (
    <Container fluid id="nav-chatting">
      <Row>
        <Col xs="6" className="nav-logo">
          <Link to="/">
            <p>운동메이트</p>
          </Link>
        </Col>
        <Col xs="6" className="nav-menus">
          <Link to="/login" className="login">
            <p>로그인</p>
          </Link>
          <ProfileComponent></ProfileComponent>
          <p onClick={showChattingLeft} className="show-members">
            멤버
          </p>
          <img src={Bars} alt="nav-bars" className="bar" onClick={showLeft} />
        </Col>
      </Row>
      <NavLeftSide></NavLeftSide>
    </Container>
  );
}
