import React from "react";
import { Container } from "react-bootstrap";
import DefaultProfile from "../../img/default-profile.png";
import "../../css/nav/profile.css";
import { Link } from "react-router-dom";
import { toggle } from "../toggle/Toggle";

function showProfileMenus(event) {
  event.preventDefault();
  toggle(".profile-list ul");
}

export default function Profile() {
  return (
    <Container className="profile-component">
      <div className="profile-img">
        <img src={DefaultProfile} alt="profileImg" onClick={showProfileMenus} />
      </div>
      <div className="profile-list" onClick={showProfileMenus}>
        <ul>
          <li>
            <Link to="/admin/post/management" className="profile-link">
              <span>관리자</span>
            </Link>
          </li>
          <li>
            <Link to="/chatting/list" className="profile-link">
              <span>채팅</span>
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  );
}
