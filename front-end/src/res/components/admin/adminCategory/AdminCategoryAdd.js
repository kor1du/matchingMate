import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../../../css/adminComponents/adminCategoryAddRightside.css";
import { axiosPost } from "../../axios/Axios";

export default function AdminCategoryAdd() {
  const [imgFile, setImgFile] = useState("");
  const [originalImgFile, setOriginalImgFile] = useState("");
  const [name, setName] = useState("");

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
    if (imgFile && name) {
      const formData = new FormData();
      formData.append("categoryImgFile", originalImgFile);
      formData.append("name", name);

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      axiosPost("/admin/category/create", formData, { headers }).then(() => {
        alert("등록완료!");
      });
    } else if (!imgFile) alert("이미지를 등록해주세요!");
    else if (!name) alert("이름을 입력해주세요!");
  };

  return (
    <>
      <Button className="title" variant="warning">
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

          <div className="name">
            <p>이름 : </p>
            <input
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
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
