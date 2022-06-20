import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import ProfileComponent from "./Profile";
import "../../css/nav/navAdmin.css";
import Bars from "../../img/bars-solid.png";
import NavLeftSide from "./NavLeftSide";

const showLeft = (event) => {
  event.preventDefault();
  const leftside = document.querySelector(".nav-left-side");
  leftside.classList.toggle("active");
};

const toggleAdminActive = (event) => {
  event.preventDefault();
  const adminLeftside = document.querySelector(".admin-left-side");
  const adminRightside = document.querySelector(".admin-right-side");
  adminLeftside.classList.toggle("active");
  adminRightside.classList.toggle("active");
=======
// import ProfileComponent from "./Profile";
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
>>>>>>> origin/jungYH
};

const disableActiveOver1024px = (event) => {
  event.preventDefault();
  const windowWidth = document.documentElement.clientWidth;
  const adminLeftside = document.querySelector(".admin-left-side");
  const adminRightside = document.querySelector(".admin-right-side");
<<<<<<< HEAD
  if (
    windowWidth > 1023 &&
    adminLeftside.classList.contains("active") &&
    adminRightside.classList.contains("active")
  ) {
    adminLeftside.classList.toggle("active");
    adminRightside.classList.toggle("active");
=======
  if (windowWidth > 1023 && adminLeftside.classList.contains("active") && adminRightside.classList.contains("active")) {
    toggle(".admin-left-side");
    toggle(".admin-right-side");
>>>>>>> origin/jungYH
  }
};

export default function NavAdmin() {
  useEffect(() => {
    window.addEventListener("resize", disableActiveOver1024px);
<<<<<<< HEAD
    return () => {
      window.removeEventListener("resize", disableActiveOver1024px);
    };
  });
=======
    // eslint-disable-next-line no-unused-vars
    const barCSS = document.querySelector(".bar");

    if (document.querySelector(".bar")) showLoginBtn();

    if (isLogin() && document.documentElement.clientWidth < 1024) {
      document.querySelector(".nav-admin-menus").style.display = "block";
    } else {
      document.querySelector(".nav-admin-menus").style.display = "none";
    } //미로그인시에는 관리자메뉴 안보이게

    return () => {
      window.removeEventListener("resize", disableActiveOver1024px);
    };
  }, []);
>>>>>>> origin/jungYH

  return (
    <Container fluid id="nav-admin">
      <Row>
        <Col xs="6" className="nav-logo">
<<<<<<< HEAD
          <Link to="/">
=======
          <Link to="/admin/post/management">
>>>>>>> origin/jungYH
            <p>운동메이트</p>
          </Link>
        </Col>
        <Col xs="6" className="nav-menus">
          <Link to="/login" className="login">
            <p>로그인</p>
          </Link>
<<<<<<< HEAD
          <ProfileComponent></ProfileComponent>
=======
          <p className="logout-1024px" onClick={logout}>
            로그아웃
          </p>
          {/* <ProfileComponent></ProfileComponent> */}
>>>>>>> origin/jungYH
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
