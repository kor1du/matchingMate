import React from "react";
import Nav from "../components/Nav/Nav";
import SignupComponent from "../components/signup/Signup";

export default function Signup() {
  return (
    <div className="container signup">
      <Nav></Nav>
      <SignupComponent></SignupComponent>
    </div>
  );
}