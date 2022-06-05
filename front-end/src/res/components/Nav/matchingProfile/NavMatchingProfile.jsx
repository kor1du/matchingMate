import React from "react";
import ShowComponent from "./ShowComponent";
import "./navMatchingProfile.css";

/* 원하는 항목을 클릭하면 ShowView에서 해당하는 Component 호출 */
export default function NavMatchingProfile() {
  return (
    <div className="nav-matching-profile">
      <ul>
        <li>
          <p onClick={() => ShowComponent("chart-category")}>종목</p>
        </li>
        <li>
          <p onClick={() => ShowComponent("chart-matching")}>매칭횟수</p>
        </li>
        <li>
          <p onClick={() => ShowComponent("interest-category")}>관심 카테고리</p>
        </li>
        <li>
          <p onClick={() => ShowComponent("history-matching")}>매칭내역</p>
        </li>
        <li>
          <p onClick={() => ShowComponent("history-rating")}>평점내역</p>
        </li>
      </ul>
    </div>
  );
}
