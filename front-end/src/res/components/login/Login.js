import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/login/login.css";
import axios from "axios";
import { setCookie } from "../cookie/Cookie";

function LoginComponent() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  // let navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    const data = {
      userId: id,
      userPw: password,
    };
    axios
      .post("http://localhost:8080/login", data)
      .then((result) => {
        window.location.replace("/");
        const jwtToken = result.data.data.accessToken;
        setCookie("jwtToken", jwtToken, {
          path: "/",
          secure: true,
          sameSite: "none",
        });
        console.log("로그인 완료!");
      })
      .catch(() => {
        alert("아이디와 비밀번호를 확인해주세요.");
        console.log("아이디없음");
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
                <Button
                  variant="primary"
                  type="submit"
                  className="login-btn"
                  onClick={login}
                >
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
