import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import View from "../../img/view.png";
import { axiosGet } from "../axios/Axios";
import "../../css/adminComponents/adminPostManagementRightside.css";
import AdminPostBoard from "./AdminPostBoard";
import BoardPagination from "../home-board/BoardPagination";

export default function AdminPostManagement() {
  const getPosts = async () => {
    const headers = {
      //서버에 데이터 요청할때 담아보낼 header정보
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      RefreshToken: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    };
    const res = async () => {
      return await axiosGet("/admin/matchingPost", headers);
    };

    return res();
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((res) => {
      const datas = res.data.data;
      setPosts(datas);
    });
  }, []);

  return (
    <>
      <Button className="admin-post-title">
        <h1>매칭 공고 관리</h1>
      </Button>

      <AdminPostBoard posts={posts}></AdminPostBoard>
    </>
  );
}
