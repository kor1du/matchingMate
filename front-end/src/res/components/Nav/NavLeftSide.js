import React from "react";
import { Link } from "react-router-dom";
import "../../css/nav/navLeftSide.css";
import Person6 from "../../img/person6.png";
import { logout } from "../logout/Logout";

export default function NavLeftSide() {
  return (
    <>
      <div className="nav-left-side">
        <p className="logout" onClick={logout}>
          로그아웃
        </p>
        <div className="profile">
          <img src={Person6} alt="person7" className="profile-img" />
          <h1>김하랑님 안녕하세요?</h1>
        </div>
        <div className="menus">
          <Link to="/admin/post/management">
            <h1>관리자메뉴</h1>
          </Link>
          <Link to="/chatting/list">
            <h1>채팅</h1>
          </Link>
          <h1>메뉴3</h1>
          <h1>메뉴4</h1>
          <h1>메뉴5</h1>
        </div>
      </div>
    </>
  );
}
