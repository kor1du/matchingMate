import React from "react";
import { Container } from "react-bootstrap";
import DefaultProfile from "../../img/default-profile.png";
import "../../css/nav/profile.css";
import { Link } from "react-router-dom";

function toggleHandler(event) {
  event.preventDefault();
  const list = document.querySelector(".profile-list ul");
  console.log("클릭됨!");
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
            <Link to="/admin" className="profile-link">
              관리자
            </Link>
          </li>
          <li>
            <Link to="/chatting" className="profile-link">
              관리자
            </Link>
          </li>
          <li>
            <Link to="/chatting" className="profile-link">
              관리자
            </Link>
          </li>
          <li>
            <Link to="/chatting" className="profile-link">
              관리자
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  );
}
