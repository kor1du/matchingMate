import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileComponent from "./Profile";
import "../../css/nav/nav.css";
import Bars from "../../img/bars-solid.png";
import NavLeftSide from "./NavLeftSide";
import { logout } from "../logout/Logout";
import { isLogin } from "../login/Login";
import { toggle } from "../toggle/Toggle";

export function showLeft(event) {
  event.preventDefault();
  toggle(".nav-left-side");
}

export const showLoginBtn = () => {
  const loginCSS = document.querySelector(".login");
  const barCSS = document.querySelector(".bar");
  const profileCSS = document.querySelector(".profile-img");
  const logoutCSS = document.querySelector(".logout-1024px");
  if (isLogin()) {
    loginCSS.style.display = "none";
    barCSS.style.display = "block;";
  } else {
    loginCSS.style.display = "block";
    barCSS.style.display = "none";
    profileCSS.style.display = "none";
    logoutCSS.style.display = "none";
  }
};

export default function Nav() {
  useEffect(() => {
    showLoginBtn();
  });

  return (
    <Container fluid id="nav">
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
          <img src={Bars} alt="nav-bars" className="bar" onClick={showLeft} />
        </Col>
      </Row>
      <NavLeftSide></NavLeftSide>
    </Container>
  );
}
