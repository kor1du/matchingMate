import React from "react";
import { Container } from "react-bootstrap";
import WinkingIcon from "../../img/winkingIcon.png";
import "../../css/home/homeHeader.css";

function Header() {
  return (
    <Container fluid className="header">
      <div className="header-logo">
        <div className="header-logo-title">
          <h1>운동메이트</h1>
          <img src={WinkingIcon} alt="" />
        </div>
        <h2>손쉬운 동네 운동친구 찾기</h2>
      </div>
    </Container>
  );
}

export default Header;
