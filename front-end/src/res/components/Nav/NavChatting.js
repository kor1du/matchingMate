import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileComponent from "./Profile";
import "../../css/nav/navChatting.css";
import Bars from "../../img/bars-solid.png";
import NavLeftSide from "./NavLeftSide";
<<<<<<< HEAD

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
=======
import { logout } from "../logout/Logout";
import { showLeft, showLoginBtn } from "./Nav";
import { toggle } from "../toggle/Toggle";

const showChattingLeft = (event) => {
  event.preventDefault();
  disableChattingRight(event);
  toggle(".chatting-left-side");
>>>>>>> origin/jungYH
};

const disableChattingRight = (event) => {
  event.preventDefault();
<<<<<<< HEAD
  const chattingRightside = document.querySelector(".chatting-right-side");
  chattingRightside.classList.toggle("active");
=======
  toggle(".chatting-right-side");
>>>>>>> origin/jungYH
};

const disableChattingLeftByWindowResize = (event) => {
  event.preventDefault();
  const windowWidth = document.documentElement.clientWidth;
  const chattingLeftside = document.querySelector(".chatting-left-side");
  const chattingRightside = document.querySelector(".chatting-right-side");
<<<<<<< HEAD
=======

>>>>>>> origin/jungYH
  if (
    windowWidth > 1023 &&
    chattingLeftside.classList.contains("active") &&
    chattingRightside.classList.contains("active")
  ) {
<<<<<<< HEAD
    chattingLeftside.classList.toggle("active");
    chattingRightside.classList.toggle("active");
=======
    toggle(".chatting-left-side");
    toggle(".chatting-right-side");
>>>>>>> origin/jungYH
  }
};

export default function navChatting() {
  useEffect(() => {
    window.addEventListener("resize", disableChattingLeftByWindowResize);
<<<<<<< HEAD
=======
    showLoginBtn();
>>>>>>> origin/jungYH
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
<<<<<<< HEAD
=======
          <p className="logout-1024px" onClick={logout}>
            로그아웃
          </p>
>>>>>>> origin/jungYH
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
