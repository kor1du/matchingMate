import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../../css/login/loginComponent.css";
import "../../css/login/loginAnimation.css";
import { redirectURL } from "../url/CheckURL";
import { axiosPost } from "../axios/Axios";
import WinkingIcon from "../../img/winkingIcon.png";
import { client } from "stompjs";
import {BsArrowLeftSquare} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

export function isLogin() {
  if (sessionStorage.getItem("jwtToken")) return true;
  else return false;
}

export function isUser() {
  if (sessionStorage.getItem("role").includes("ROLE_USER")) return true;
  else return false;
}

function LoginComponent(props) {
  useEffect(() => {
    setLoginComponent(document.querySelector(".login-component"));
    setloginBtnDiv(document.querySelector(".btn-show-login"));
    setLoginDisplay(document.querySelector(".display-login"));
    setLoginBtn(document.querySelector(".btn-show-login .btn"));
    setLoginGreetingBtn(document.querySelector(".greeting-btn"));
  }, [props]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginComponent, setLoginComponent] = useState("");
  const [loginBtnDiv, setloginBtnDiv] = useState("");
  const [loginBtn, setLoginBtn] = useState("");
  const [loginDisplay, setLoginDisplay] = useState("");
  const [loginGreetingBtn, setLoginGreetingBtn] = useState("");
  const { signupBtn } = props;

  const toggleActive = () => {
    loginComponent.classList.toggle("active");
    loginBtnDiv.classList.toggle("active");
    loginDisplay.classList.toggle("active");
  };

  const showLogin = () => {
    const clientWidth = document.body.clientWidth;

    setTimeout(() => {
      if (clientWidth < 1024) {
        loginDisplay.classList.toggle("login-enter");
      } else {
        loginBtnDiv.style.left = "50%";
        loginDisplay.style.right = "50%";
        loginBtnDiv.classList.toggle("login-enter-left");
        loginDisplay.classList.toggle("login-enter-right");
        loginBtn.classList.toggle("active");
        loginGreetingBtn.classList.toggle("active");
      }

      signupBtn.style.display = "none";
      toggleActive();
    }, 500);

    setTimeout(() => {
      if (clientWidth < 1024) {
        loginDisplay.classList.toggle("login-enter");
      } else {
        loginBtnDiv.classList.toggle("login-enter-left");
        loginDisplay.classList.toggle("login-enter-right");
      }
    }, 2500);
  };

  const hideLogin = () => {
    const clientWidth = document.body.clientWidth;

    if (clientWidth < "1024") {
      loginDisplay.classList.toggle("login-leave");
      setTimeout(() => {
        toggleActive();
        signupBtn.style.display = "flex";
      }, 1200);

      setTimeout(() => {
        loginDisplay.classList.toggle("login-leave");
      }, 1500);
    } else {
      loginBtnDiv.style.left = "0%";
      loginDisplay.style.right = "0%";
      loginBtnDiv.classList.toggle("login-enter-right-hide");
      loginDisplay.classList.toggle("login-enter-left-hide");
      setTimeout(() => {
        toggleActive();
        loginBtnDiv.classList.toggle("login-enter-right-hide");
        loginDisplay.classList.toggle("login-enter-left-hide");
        signupBtn.style.display = "flex";
        loginBtn.classList.toggle("active");
        loginGreetingBtn.classList.toggle("active");
      }, 950);
    }
  };

  function login() {
    // navigete
    const navigate = useNavigate();

    const data = {
      userId: id,
      userPw: password,
    };
    axiosPost("/login", data)
      .then((result) => {
        navigate(-1);

        const jwtToken = result.data.data.tokenDTO.accessToken;
        sessionStorage.setItem("jwtToken", jwtToken);
        sessionStorage.setItem("nickname", result.data.data.nickname);
        sessionStorage.setItem("profileImgAddress", result.data.data.profileImgAddress);
        sessionStorage.setItem("role", result.data.data.role);
      })
      .catch(() => {
        alert("아이디와 비밀번호를 확인해주세요.");
      });
  }

  return (
    <div className="login-component">
      <div className="btn-show-login">
        <div className="greeting greeting-btn">
          <span>운동메이트에 오신걸 환영해요!</span>
          <img src={WinkingIcon} />
        </div>
        <Button
          onClick={() => {
            showLogin();
          }}
        >
          <p>로그인</p>
        </Button>
      </div>
      <div className="display-login">
        <p className="btn-close" onClick={() => hideLogin()}>
          <BsArrowLeftSquare/>
        </p>
        <div className="greeting">
          <span>운동메이트에 오신걸 환영해요!</span>
          <img src={WinkingIcon} />
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID"
            onChange={(e) => {
              e.preventDefault();
              setId(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            <p>운동메이트는 절대로 개인정보를 공유하지 않습니다.</p>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div className="btn-login">
          <Button
            onClick={() => {
              login();
            }}
          >
            <p>로그인</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
