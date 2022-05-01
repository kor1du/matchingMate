import React from "react";
import LoginComponent from "../components/login/Login";
import Nav from "../components/nav/Nav";

function Login() {
  return (
    <div className="container login">
      <Nav />
      <LoginComponent />
    </div>
  );
}

export default Login;
