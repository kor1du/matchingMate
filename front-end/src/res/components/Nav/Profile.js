import React from "react";
import { Container } from "react-bootstrap";
import DefaultProfile from "../../img/default-profile.png";
import "../../css/nav/profile.css";
import { Link } from "react-router-dom";

function toggleHandler(event) {
  event.preventDefault();
  const list = document.querySelector(".profile-list ul");
  list.classList.toggle("active");
}

export default function Profile() {
  return (
    <Container className="profile-component">
      <div className="profile-img">
        <img src={DefaultProfile} alt="profileImg" onClick={toggleHandler} />
      </div>
      <div className="profile-list" onClick={toggleHandler}>
        <ul>
          <li>
            <Link to="/admin/post/management" className="profile-link">
              <span>관리자</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/post/management" className="profile-link">
              <span>관리자</span>
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  );
}
