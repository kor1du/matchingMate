import React from "react";
import { Container } from "react-bootstrap";
// import DefaultProfile from "../../img/default-profile.png";
import "../../css/nav/profile.css";
import { Link } from "react-router-dom";
import { toggle } from "../toggle/Toggle";
import { logout } from "../logout/Logout";
// import Button from '@mui/material/Button';


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

                {/* <Link to="/chat" className="profile-link">
                  <Button sx={{width:"100%"}} variant="contained">채팅하러 가기~</Button>
                </Link> */}
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
          </li>
        </ul>
      </div>
    </Container>
  );
}
