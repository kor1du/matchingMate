import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
// import View from "../../../img/view.png";
import { getAdminPosts } from "../../axios/Axios";
import "../../../css/adminComponents/adminPostManagementRightside.css";
import AdminPostBoard from "./AdminPostBoard";

export default function AdminPostManagement() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAdminPosts("/admin/matchingPost").then((res) => {
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
