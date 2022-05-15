import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/login/login.css";
// import { setCookie } from "../cookie/Cookie";
import { redirectURL } from "../url/CheckURL";
import { axiosPost } from "../axios/Axios";

export function isLogin() {
  if (sessionStorage.getItem("jwtToken")) return true;
  else return false;
}

function LoginComponent() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();
    const data = {
      userId: id,
      userPw: password,
    };
    axiosPost("/login", data)
      .then((result) => {
        redirectURL("login");
        redirectURL("");
        const jwtToken = result.data.data.accessToken;
        sessionStorage.setItem("jwtToken", jwtToken);
      })
      .catch(() => {
        alert("아이디와 비밀번호를 확인해주세요.");
      });
  }

  return (
    <div className="login-component">
      <Card>
        <Card.Header as="h5">로그인</Card.Header>
        <Card.Body>
          <span className="card-text">
            <Form>
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
              <div className="login-btns">
                <Button variant="primary" type="submit" className="login-btn" onClick={login}>
                  <p>로그인</p>
                </Button>
                <Button variant="primary" className="signup-btn">
                  <Link to="/signup">
                    <p>회원가입</p>
                  </Link>
                </Button>
              </div>
            </Form>
          </span>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginComponent;
