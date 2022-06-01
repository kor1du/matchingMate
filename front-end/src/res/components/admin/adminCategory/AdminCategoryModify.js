import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../../../css/adminComponents/adminCategoryModifyRightside.css";
import queryString from "query-string";


export default function AdminCategoryModify() {
  const location = useLocation();
  const [imgFile, setImgFile] = useState("");
  const [originalImgFile, setOriginalImgFile] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [query, setQuery] = useState("");

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
    if (imgFile && name && id) {
      const formData = new FormData();
      formData.append("categoryImgFile", originalImgFile);
      formData.append("name", name);
      formData.append("categoryId", id);

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      axios
        .put("http://localhost:8080/admin/update", formData, { headers })
        .then(() => {
          alert("수정완료!");
        });
    } else if (!imgFile) alert("이미지를 등록해주세요!");
    else if (!name) alert("이름을 입력해주세요!");
    else alert("아이디를 입력해주세요!!");
  };

  useEffect(() => {
    setQuery(queryString.parse(location.search));
    setId(query.id);
    setName(query.name);
    setImgFile(query.img);
  }, [id]);

  return (
    <>
      <Button className="title" variant="warning">
        <h1>카테고리수정</h1>
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
              placeholder={`현재 이름 : ${name}`}
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
              <p>수정하기</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
