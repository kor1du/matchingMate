import React from "react";
import { Button } from "react-bootstrap";
import { DiGithubBadge } from "react-icons/di";
import "../../css/adminComponents/adminBadgeModifyRightside.css";

export default function AdminBadgeModify() {
  return (
    <>
      <Button className="title" variant="success">
        <h1>뱃지수정</h1>
      </Button>

      <div className="upload">
        <h1 className="img-preview-text">이미지 미리보기</h1>
        <DiGithubBadge className="badge-img" />
        <div className="detail">
          <div className="file">
            <input type="file" />
          </div>

          <div className="name">
            <p>이름 : </p>
            <input type="text" />
          </div>

          <div className="tag">
            <p>태그 : </p>
            <input type="text" />
          </div>
        </div>
        <Button>
          <p className="btn-modify">수정하기</p>
        </Button>
      </div>
    </>
  );
}
