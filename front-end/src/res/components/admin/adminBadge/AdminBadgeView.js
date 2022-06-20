import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../../css/adminComponents/adminBadgeViewRightside.css";
import { axiosGet } from "../../axios/Axios";
import { AdminbadgeItem } from "./AdminBadgeItem";

export default function AdminBadgeView() {
  const [badges, setBadges] = useState("");
  useEffect(() => {
    axiosGet("/admin/badge").then((res) => {
      const data = res.data.data;
      setBadges(data);
    });
  }, []);

  return (
    <>
      <div className="title-box">
        <Button className="title" variant="success">
          <h1>뱃지조회</h1>
        </Button>
      </div>
      <AdminbadgeItem badges={badges} />
    </>
  );
}
