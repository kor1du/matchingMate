import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import LoginComponent from "../components/login/Login";
import SignupComponent from "../components/signup/Signup";
import Nav from "../components/nav/Nav";
import "../css/login/login.css";

function Login() {
  const [loginBtn, setLoginBtn] = useState("");
  const [signupBtn, setSignupBtn] = useState("");

  useEffect(() => {
    setLoginBtn(document.querySelector(".login-component"));
    setSignupBtn(document.querySelector(".signup-component"));
  }, []);

  return (
    <div className="container-login">
      <Nav />
      <Card>
        <Card.Body>
          <LoginComponent signupBtn={signupBtn}></LoginComponent>
          <SignupComponent loginBtn={loginBtn}></SignupComponent>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;