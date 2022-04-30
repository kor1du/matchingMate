import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileComponent from "./Profile";
import "../../css/nav/nav.css";
import Bars from "../../img/bars-solid.png";
import NavLeftSide from "./NavLeftSide";

const showLeft = (event) => {
  event.preventDefault();
  const leftside = document.querySelector(".nav-left-side");
  leftside.classList.toggle("active");
};

export default function Nav() {
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
          <ProfileComponent></ProfileComponent>
          <Link to="/admin/post/management" className="admin-link">
            <p>관리자(임시)</p>
          </Link>
          <img src={Bars} alt="nav-bars" className="bar" onClick={showLeft} />
        </Col>
      </Row>
      <NavLeftSide></NavLeftSide>
    </Container>
  );
}
