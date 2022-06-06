import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { axiosDelete, axiosGet } from "../../axios/Axios";
import TestCategory from "./testCategory";
import "./category.css";

const Category = () => {
  const [categorys, setCategorys] = useState("");

  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const [interestCategory, setInterestCategory] = useState([]);

  const readCategorys = async () => {
    const res = await (await axiosGet("/category", { Authorization: token })).data;

    setCategorys(res.data);
  };
  const readInterestCategory = async () => {
    const res = await (await axiosGet("/profile/interestCategory", { Authorization: token })).data;

    setInterestCategory(res.data);
  };

  const categoryDelete = (id) => {
    axiosDelete(`/profile/interestCategory/delete/${id}`, null);
    alert("삭제 완료되었습니다.");

    // setInterestCategory(interestCategory.filter((item)=> item.id !== id));
    readInterestCategory();
  };

  useEffect(() => {
    readCategorys();
    readInterestCategory();
  }, []);

  return (
    <div className="interest-category">
      <TestCategory
        categorys={categorys}
        interestCategory={interestCategory}
        setInterestCategory={setInterestCategory}
        categoryDelete={categoryDelete}
      />
    </div>
  );
};

export default Category;
