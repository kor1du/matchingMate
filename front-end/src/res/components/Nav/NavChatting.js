import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileComponent from "./Profile";
import "../../css/nav/navChatting.css";
import Bars from "../../img/bars-solid.png";
import NavLeftSide from "./NavLeftSide";
import { logout } from "../logout/Logout";
import { showLeft, showLoginBtn } from "./Nav";
import { toggle } from "../toggle/Toggle";

const showChattingLeft = (event) => {
  event.preventDefault();
  disableChattingRight(event);
  toggle(".chatting-left-side");
};

const disableChattingRight = (event) => {
  event.preventDefault();
  toggle(".chatting-right-side");
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
    toggle(".chatting-left-side");
    toggle(".chatting-right-side");
  }
};

export default function navChatting() {
  useEffect(() => {
    window.addEventListener("resize", disableChattingLeftByWindowResize);
    showLoginBtn();
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
          <p className="logout-1024px" onClick={logout}>
            로그아웃
          </p>
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
