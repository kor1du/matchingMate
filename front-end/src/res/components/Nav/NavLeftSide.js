import React from "react";
import "../../css/nav/navLeftSide.css";
import Person6 from "../../img/person6.png";

export default function NavLeftSide() {
  return (
    <>
      <div className="nav-left-side">
        <div className="profile">
          <img src={Person6} alt="person7" className="profile-img" />
          <h1>김하랑님 안녕하세요?</h1>
        </div>
        <div className="menus">
          <h1>메뉴1</h1>
          <h1>메뉴2</h1>
          <h1>메뉴3</h1>
          <h1>메뉴4</h1>
          <h1>메뉴5</h1>
        </div>
      </div>
    </>
  );
}
