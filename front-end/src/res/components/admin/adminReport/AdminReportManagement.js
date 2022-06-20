import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import View from "../../../img/view.png";
import "../../../css/adminComponents/adminReportManagementRightside.css";
import { getAdminPosts } from "../../axios/Axios";
import AdminReportBoard from "./AdminReportBoard";

export default function AdminReportManagement() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getAdminPosts("/admin/report").then((res) => {
      const data = res.data.data;

      setReports(data);
    });
  }, []);
  return (
    <>
      <Button className="admin-report-title" variant="secondary">
        <h1>신고 관리</h1>
      </Button>

      <div className="admin-report-search">
        <img src={View} alt="magnifying-glass" className="icon" />
        <form action="#" className="search">
          <input type="text" className="searchText" />
          <input type="submit" className="searchBtn" value="검색"></input>
        </form>
      </div>
      <div className="admin-report">
        <AdminReportBoard reports={reports}></AdminReportBoard>
      </div>
    </>
  );
}
