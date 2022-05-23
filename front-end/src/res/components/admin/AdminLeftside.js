import React, { useEffect } from "react";
import ProfileImg from "../../img/person3.png";
import "../../css/adminComponents/adminLeftside.css";
import { Link } from "react-router-dom";

function parseCategoryName() {
  const entireUrl = document.location.href;
  const url = entireUrl.split("/");
  const categoryName = url[4] + url[5];
  return categoryName;
}

function changeCategoryName(categoryName) {
  switch (categoryName) {
    case "postmanagement":
      categoryName = ".post-management";
      break;
    case "reportmanagement":
      categoryName = ".report-management";
      break;
    case "categoryadd":
      categoryName = ".category-add";
      break;
    case "categoryview":
      categoryName = ".category-view";
      break;
    case "badgeadd":
      categoryName = ".badge-add";
      break;
    case "badgeview":
      categoryName = ".badge-view";
      break;
  }

  return categoryName;
}

function findCategoryProperty(categoryName) {
  const currentDocument = document.querySelector(
    ".admin-left-side " + categoryName
  );
  return currentDocument;
}

function changePropertyColor(property) {
  property.style.backgroundColor = "rgba(0,0,0,0.2)";
}

function highlightCurrentCategory() {
  let categoryName = parseCategoryName();
  if (categoryName.includes("modify")) return;
  else {
    categoryName = changeCategoryName(categoryName);

    if (categoryName.indexOf(".") != -1) {
      const property = findCategoryProperty(categoryName);
      changePropertyColor(property);
    }
  }
}

export default function AdminLeftside() {
  useEffect(() => {
    highlightCurrentCategory();
  });

  return (
    <>
      <div className="admin-profile">
        <img
          src={ProfileImg}
          alt="admin-profile-img"
          className="admin-profile-img"
        />
        <span className="admin-profile-name">관리자님</span>
      </div>

      <div className="admin-managements">
        <Link to="/admin/post/management">
          <h1 className="post-management">매칭공고관리</h1>
        </Link>
        <Link to="/admin/report/management">
          <h1 className="report-management">신고관리</h1>
        </Link>

        <ul className="category-management">
          <h1 className="category-title">카테고리관리</h1>
          <Link to="/admin/add">
            <li className="category-item category-add">
              <p>카테고리추가</p>
            </li>
          </Link>
          <Link to="/admin/view">
            <li className="category-item category-view">
              <p>카테고리조회</p>
            </li>
          </Link>
        </ul>
        <ul className="badge-management">
          <h1 className="badge-title">뱃지관리</h1>
          <Link to="/admin/badge/add">
            <li className="badge-item badge-add">
              <p>뱃지추가</p>
            </li>
          </Link>
          <Link to="/admin/badge/view">
            <li className="badge-item badge-view">
              <p>뱃지조회</p>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
