import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileComponent from "./Profile";
import "../../css/nav/navAdmin.css";
import Bars from "../../img/bars-solid.png";
import NavLeftSide from "./NavLeftSide";
import { logout } from "../logout/Logout";
import { showLeft, showLoginBtn } from "./Nav";
import { toggle } from "../toggle/Toggle";
import { isLogin } from "../login/Login";

const toggleAdminActive = (event) => {
  event.preventDefault();
  toggle(".admin-left-side");
  toggle(".admin-right-side");
};

const disableActiveOver1024px = (event) => {
  event.preventDefault();
  const windowWidth = document.documentElement.clientWidth;
  const adminLeftside = document.querySelector(".admin-left-side");
  const adminRightside = document.querySelector(".admin-right-side");
  if (
    windowWidth > 1023 &&
    adminLeftside.classList.contains("active") &&
    adminRightside.classList.contains("active")
  ) {
    toggle(".admin-left-side");
    toggle(".admin-right-side");
  }
};

export default function NavAdmin() {
  useEffect(() => {
    window.addEventListener("resize", disableActiveOver1024px);
    showLoginBtn();

    if (isLogin()) {
      document.querySelector(".nav-admin-menus").style.display = "block";
    } else {
      document.querySelector(".nav-admin-menus").style.display = "none";
    } //미로그인시에는 관리자메뉴 안보이게

    return () => {
      window.removeEventListener("resize", disableActiveOver1024px);
    };
  });

  return (
    <Container fluid id="nav-admin">
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
          <p className="nav-admin-menus" onClick={toggleAdminActive}>
            관리자 메뉴
          </p>
          <img src={Bars} alt="nav-bars" className="bar" onClick={showLeft} />
        </Col>
      </Row>
      <NavLeftSide></NavLeftSide>
    </Container>
  );
}
