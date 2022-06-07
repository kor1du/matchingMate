import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileComponent from "./Profile";
import "../../css/nav/nav.css";
import Bars from "../../img/bars-solid.png";
import NavLeftSide from "./NavLeftSide";
import { isLogin } from "../login/Login";
import { toggle } from "../toggle/Toggle";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { axiosGet } from "../axios/Axios";
import axios from "axios";
import ReportIcon from "@mui/icons-material/Report";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Avatar from "@mui/material/Avatar";
import { pink, blue } from "@mui/material/colors";

export function showLeft(event) {
  event.preventDefault();
  toggle(".nav-left-side");
}

export const showLoginBtn = () => {
  const loginCSS = document.querySelector(".login");
  const barCSS = document.querySelector(".bar");
  const profileCSS = document.querySelector(".profile-img");
  // const logoutCSS = document.querySelector(".logout-1024px");
  const notificationCss = document.querySelector(".nav-notification");

  if (isLogin()) {
    loginCSS.style.display = "none";
    barCSS.style.display = "block;";

    if (notificationCss != null) notificationCss.style.display = "block";
  } else {
    loginCSS.style.display = "block";
    barCSS.style.display = "none";
    profileCSS.style.display = "none";
    // logoutCSS.style.display = "none";

    if (notificationCss != null) notificationCss.style.display = "none";
  }
};

// const useInterval = (callback, delay) => {
//   const [savedCallback, setSavedCallback] = useState(null) // useState사용

//   // callback이 바뀔 때마다 실행
//   // 첫 실행에 callback이 한 번 들어옴 -> 리렌더링 -> 다시 들어옴 -> 리렌더링 -> .. 무한 반복
//   // 원래의 의도는 callback이 새로 들어오면 그 callback을 저장해두고 아래의 setInterval을 다시 실행해주려는 의도
//   useEffect(() => {
//     setSavedCallback(callback);
//   }, [callback]);

//   // mount가 끝나고 1번 일어남
//   // 맨 처음 mount가 끝나고 savedCallback은 null이기 때문에 setInterval의 executeCallback이 제대로 실행되지 않음 (null이기 때문에)
//   useEffect(() => {
//     // console.log(savedCallback());
//     const executeCallback = () => {
//       savedCallback();
//     };

//     const timerId = setInterval(executeCallback, 60000);

//     return () => clearInterval(timerId);
//   }, []);
// };

export default function Nav() {
  const [notifications, setNotifications] = useState("");
  const [noReadCount, setNoReadCount] = useState("");

  const ref = useRef(null);
  const headers = {
    Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
  };

  function ShowNotification({ notification }) {
    return (
      <Link style={{ height: "20px", fontSize: "0rem" }} to="/match">
        <li className="notification-list">
          <p style={{ width: "40px", margin: "0px", marginLeft: "10px" }}>
            {notification.notificationType === "신고처리" ? (
              <Avatar sx={{ bgcolor: blue[600] }}>
                <ReportIcon />
              </Avatar>
            ) : (
              <Avatar sx={{ bgcolor: pink[500] }}>
                <FavoriteBorderIcon />
              </Avatar>
            )}
          </p>
          <p className="font" style={{}}>
            {notification.message}
          </p>
          <p className="font" style={{ margin: "0px", width: "90px" }}>
            {notification.registerDatetime}
          </p>
        </li>
      </Link>
    );
  }

  function ShowNoNotification() {
    return (
      <li style={{ textAlign: "center" }} className="notification-list">
        <p>오늘 알림이 없습니다.</p>
      </li>
    );
  }

  const clickBell = () => {
    const alarms = document.querySelector(".nav-notification-box");
    alarms.classList.toggle("active");

    axios
      .put(" https://2adb-60-253-18-218.jp.ngrok.io/notification", null, {
        headers: headers,
      })
      .then((res) => {
        setNoReadCount(0);
        console.log(res.data);
      });
  };

  const getTodayNotification = () => {
    if (headers !== undefined && sessionStorage.getItem("jwtToken")) {
      axiosGet("/notification", headers).then((res) => {
        res = JSON.parse(JSON.stringify(res));
        const { data } = res.data;
        console.log(data);
        setNotifications((notifications) => {
          notifications = data.todayNotificationDTOList;
          return notifications;
        });
        setNoReadCount(data.noReadCount);
      });
    }
  };

  // useInterval(() => {
  //   getTodayNotification();
  // }, 60000);

  useEffect(() => {
    getTodayNotification();
    showLoginBtn();
  }, []);

  function buttonClickHandler() {
    document.querySelector(".container-match-profile .nav-matching-profile").classList.toggle("actived");
  }

  return (
    <Container fluid id="nav">
      <Row>
        <Col xs="6" className="nav-logo">
          <Link to="/">
            <p>운동 메이트</p>
          </Link>
        </Col>
        <Col xs="6" className="nav-menus">
          <Link to="/login" className="login" ref={ref}>
            <p className="font">로그인</p>
          </Link>
          {/* <p className="logout-1024px" onClick={logout}>
            로그아웃
          </p> */}
          {/* <AiFillBell className="nav-notification" onClick={clickBell}></AiFillBell> */}
          <Badge className="nav-notification" badgeContent={noReadCount} color="warning">
            <NotificationsIcon color="white" onClick={clickBell} />
          </Badge>
          {notifications.length > 0 ? (
            <div className="nav-notification-box">
              {notifications.map((notification) => {
                return <ShowNotification key={notification.id} notification={notification}></ShowNotification>;
              })}
            </div>
          ) : (
            <div className="nav-notification-box">
              <ShowNoNotification />
            </div>
          )}

          <ProfileComponent></ProfileComponent>
          <img src={Bars} alt="nav-bars" className="bar" onClick={showLeft} />

          {document.querySelector(".container-match-profile") !== null ? (
            <Button
              variant="success"
              style={{ position: "static", marginLeft: "30px" }}
              onClick={(e) => {
                e.preventDefault();
                buttonClickHandler();
              }}
            >
              Menu
            </Button>
          ) : null}
        </Col>
      </Row>
      <NavLeftSide></NavLeftSide>
    </Container>
  );
}
