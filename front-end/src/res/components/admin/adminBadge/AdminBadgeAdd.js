import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../../../css/adminComponents/adminBadgeAddRightside.css";
import { axiosPost } from "../../axios/Axios";

export default function AdminBadgeAdd() {
  const [imgFile, setImgFile] = useState("");
  const [originalImgFile, setOriginalImgFile] = useState("");
  const [count, setCount] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgFile(reader.result);
        resolve;
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (imgFile && count) {
      const formData = new FormData();
      formData.append("badgeImgFile", originalImgFile);
      formData.append("name", name);
      formData.append("overMatchingCount", count);

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      console.log(formData);
      axiosPost("/admin/badge/create", formData, { headers }).then(() => {
        alert("등록완료!");
      });
    } else if (!imgFile) alert("이미지를 등록해주세요!");
    else if (!name) alert("이름을 입력해주세요!");
  };

  return (
    <>
      <Button className="title" variant="success">
        <h1>카테고리추가</h1>
      </Button>

      <div className="upload">
        <h1 className="img-preview-text">이미지 미리보기</h1>

        <img src={imgFile} alt="이미지 미리보기" className="uploaded-img" />

        <div className="detail">
          <div className="file">
            <input
              type="file"
              onChange={(e) => {
                setOriginalImgFile(e.target.files[0]);
                encodeFileToBase64(e.target.files[0]);
              }}
            />
          </div>
          <div className="count">
            <p>조건 : </p>
            <input
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setCount(e.target.value);
              }}
            />
          </div>
          <div className="submit">
            <Button
              className="btn-modify"
              onClick={(e) => {
                e.preventDefault();
                onSubmitHandler(e);
              }}
            >
              <p>등록하기</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
