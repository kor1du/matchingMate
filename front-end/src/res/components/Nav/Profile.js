import React from "react";
import { Container } from "react-bootstrap";
<<<<<<< HEAD
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
=======
// import DefaultProfile from "../../img/default-profile.png";
import "../../css/nav/profile.css";
import { Link } from "react-router-dom";
import { toggle } from "../toggle/Toggle";
import { logout } from "../logout/Logout";
import { BsFillChatDotsFill } from "react-icons/bs";


function showProfileMenus(event) {
  event.preventDefault();
  toggle(".profile-list ul");
}

export default function Profile() {
  const nickname = sessionStorage.getItem("nickname");
  const profileImgAddress = sessionStorage.getItem("profileImgAddress");

  return (
    <Container className="profile-component">
      <div className="profile-img">
        {/* <span style={{marginRight:"10px"}}>{nickname}</span> */}
        <img className="profile-img" src={profileImgAddress} alt="profileImg" onClick={showProfileMenus} />
      </div>

      <div className="profile-list" onClick={showProfileMenus}>
        <ul>
          <li>
            <div className="profile-userInfo">
              <div>
                <img
                  style={{ width: "100px", height: "100px" }}
                  className="profile-userInfo-img"
                  src={profileImgAddress}
                  alt="profileImg"
                />
              </div>
              <div className="profile-userInfo-info">

                <h3 className="font" style={{ fontSize: "40px" }}>
                  {nickname}
                </h3>

                
                {/* <Link to="/chat" className="chat-icon"> */}
                <Link to="/chat" className="chat-icon-container">
                  <BsFillChatDotsFill className="chat-icon"/>
                </Link>
                {/* </Link> */}
              </div>

            </div>
          </li>
          <li>
            <div style={{ display: "inline-flex", width: "100%", textAlign: "center", borderTop: "1px solid black" }}>
              <Link style={{ width: "50%", borderRight: "1px solid black" }} to="/member" className="profile-link">
                <div>
                  {/* <Link to="/member" className="profile-link"> */}
                  {/* <Button sx={{width:"100%"}} variant="contained">계정 관리</Button> */}
                  <h5 className="font" style={{ width: "100%" }}>
                    계정 관리
                  </h5>
                  {/* </Link> */}
                </div>
              </Link>
              <Link style={{ width: "50%" }} to="/match" className="profile-link">
                <div>
                  {/* <Link to="/match" className="profile-link"> */}
                  {/* <Button sx={{width:"100%"}} variant="contained">프로필 관리</Button> */}
                  <h5 className="font" style={{ width: "100%" }}>
                    프로필 관리
                  </h5>

                  {/* </Link> */}
                </div>
              </Link>
            </div>
          </li>


          <li style={{ borderTop: "1px solid black", cursor: "pointer" }}>
            <div style={{ width: "100%" }} className="profile-userInfo-logout" onClick={logout}>
              {/* <Button className='profile-userInfo-logout-btn'  onClick={logout} variant="contained">로그아웃</Button> */}
              <h5 className="font" style={{ width: "100%", color: "red" }}>
                로그아웃
              </h5>

            </div>
>>>>>>> origin/jungYH
          </li>
        </ul>
      </div>
    </Container>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/jungYH
