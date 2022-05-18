import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileComponent from "./Profile";
import "../../css/nav/nav.css";
import Bars from "../../img/bars-solid.png";
import NavLeftSide from "./NavLeftSide";
import { logout } from "../logout/Logout";
import { isLogin } from "../login/Login";
import { toggle } from "../toggle/Toggle";
import { AiFillBell } from "react-icons/ai";
import { axiosGet } from "../axios/Axios";

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
  const [notifications, setNotifications] = useState("");

  const ref = useRef(null);
  const headers = {
    Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
  };

  function ShowNotification({ notification }) {
    return (
      <li className="notification-list">
        <p>분류 : {notification.notificationType}</p>
        <p>내용 : {notification.message}</p>
      </li>
    );
  }
  const clickBell = () => {
    const alarms = document.querySelector(".nav-notification-box");
    alarms.classList.toggle("active");
  };
  useEffect(() => {
    if (headers !== undefined && sessionStorage.getItem("jwtToken")) {
      axiosGet("/notification", headers).then((res) => {
        res = JSON.parse(JSON.stringify(res));
        const { data } = res.data;
        setNotifications((notifications) => {
          notifications = data;
          return notifications;
        });
      });
    }
    showLoginBtn();
  }, []);

  return (
    <Container fluid id="nav">
      <Row>
        <Col xs="6" className="nav-logo">
          <Link to="/">
            <p>운동메이트</p>
          </Link>
        </Col>
        <Col xs="6" className="nav-menus">
          <Link to="/login" className="login" ref={ref}>
            <p>로그인</p>
          </Link>
          <p className="logout-1024px" onClick={logout}>
            로그아웃
          </p>
          <AiFillBell className="nav-notification" onClick={clickBell}></AiFillBell>
          {notifications.length > 0 ? (
            <div className="nav-notification-box">
              {notifications.map((notification) => {
                return (
                  <ShowNotification
                    key={notification.id}
                    notification={notification}
                  ></ShowNotification>
                );
              })}
            </div>
          ) : null}
          <ProfileComponent></ProfileComponent>
          <img src={Bars} alt="nav-bars" className="bar" onClick={showLeft} />
        </Col>
      </Row>
      <NavLeftSide></NavLeftSide>
    </Container>
  );
}
