import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../../css/adminComponents/adminCategoryViewRightside.css";
import { axiosGet } from "../../axios/Axios";
import { AdminCategoryItem } from "./AdminCategoryItem";

export default function AdminCategoryView() {
  const [categorys, setCategorys] = useState("");
  useEffect(() => {
    axiosGet("/admin/category").then((res) => {
      const data = res.data.data;
      setCategorys(data);
    });
  }, []);

  return (
    <>
      <div className="title-box">
        <Button className="title" variant="warning">
          <h1>카테고리조회</h1>
        </Button>
      </div>
      <AdminCategoryItem categorys={categorys}></AdminCategoryItem>
    </>
  );
}
