import React from "react";
<<<<<<< HEAD
import "../../css/nav/navLeftSide.css";
import Person6 from "../../img/person6.png";

export default function NavLeftSide() {
  return (
    <>
      <div className="nav-left-side">
        <div className="profile">
          <img src={Person6} alt="person7" className="profile-img" />
          <h1>김하랑님 안녕하세요?</h1>
        </div>
        <div className="menus">
          <h1>메뉴1</h1>
          <h1>메뉴2</h1>
          <h1>메뉴3</h1>
          <h1>메뉴4</h1>
          <h1>메뉴5</h1>
=======
import { Link } from "react-router-dom";
import "../../css/nav/navLeftSide.css";
// import Person6 from "../../img/person6.png";
import { logout } from "../logout/Logout";

export default function NavLeftSide() {
  const nickname = sessionStorage.getItem("nickname");
  const profileImgAddress = sessionStorage.getItem("profileImgAddress");
  return (
    <>
      <div className="nav-left-side">
        <p className="logout" onClick={logout}>
          로그아웃
        </p>
        <div className="profile">
          <img src={profileImgAddress} alt="person7" className="profile-img" />
          <h1>{nickname}</h1> <h3 style={{ marginLeft: "15px" }}>님 안녕하세요?</h3>
        </div>
        <div className="menus">
          <Link to="/member">
            <h1>계정</h1>
          </Link>
          <Link to="/match">
            <h1>매칭프로필</h1>
          </Link>
          <Link to="/chat">
            <h1>채팅</h1>
          </Link>
>>>>>>> origin/jungYH
        </div>
      </div>
    </>
  );
}
