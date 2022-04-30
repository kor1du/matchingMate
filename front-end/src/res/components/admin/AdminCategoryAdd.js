import React from "react";
import { Button } from "react-bootstrap";
import "../../css/adminComponents/adminCategoryAddRightside.css";
import MartialArtsUniform from "../../img/martial-arts-uniform.png";

export default function AdminCategoryAdd() {
  return (
    <>
      <Button className="title" variant="warning">
        <h1>카테고리추가</h1>
      </Button>

      <div className="upload">
        <h1 className="img-preview-text">이미지 미리보기</h1>

        <img
          src={MartialArtsUniform}
          alt="martial-arts-uniform"
          className="uploaded-img"
        />

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
          <p className="btn-upload">등록하기</p>
        </Button>
      </div>
    </>
  );
}
