import React from "react";
import { Container } from "react-bootstrap";
// import DefaultProfile from "../../img/default-profile.png";
import "../../css/nav/profile.css";
import { Link } from "react-router-dom";
import { toggle } from "../toggle/Toggle";
import { logout } from "../logout/Logout";
import Button from '@mui/material/Button';


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
              <div >
                <img style={{width:"100px", height:"100px"}} className="profile-userInfo-img" src={profileImgAddress} alt="profileImg" />
              </div>
              <div className="profile-userInfo-info">
                <h3>{nickname}</h3> 
                {/* <h6>한줄소개</h6>  */}
              </div>

              
                
              
            </div>
          </li>
          <li>
            <div style={{display:"inline-flex", width:"100%", textAlign:"center"}}>
              <div style={{width:"50%"}}>
                <Link to="/member" className="profile-link">
                  <Button sx={{width:"100%"}} variant="contained">계정 관리</Button>
                </Link>
                </div>

                <div style={{width:"50%"}}>
                  <Link to="/match" className="profile-link">
                    <Button sx={{width:"100%"}} variant="contained">프로필 관리</Button>
                  </Link>
              </div>
            </div>
          </li>
         
          <li>
            <div className='profile-userInfo-logout'>
              <Button className='profile-userInfo-logout-btn'  onClick={logout} variant="contained">로그아웃</Button>
            </div>
            {/* <div className="profile-link">
              <p className="logout-1024px" onClick={logout}>
                <span>로그아웃</span>
              </p>
            </div> */}
          </li>
        </ul>
      </div>
    </Container>
  );
}
