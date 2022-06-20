import React from "react";
import { Col, Row } from "react-bootstrap";
import "../../css/admin/admin.css";
import AdminLeftside from "../../components/admin/AdminLeftside";
<<<<<<< HEAD
import AdminReportManagementRight from "../../components/admin/AdminReportManagement";
import NavAdmin from "../../components/Nav/NavAdmin";
import NavPagination from "../../components/Nav/NavPagination";
=======
import AdminReportManagementRight from "../../components/admin/adminReport/AdminReportManagement";
import NavAdmin from "../../components/nav/NavAdmin";

>>>>>>> origin/jungYH

export default function AdminPostManagement() {
  return (
    <>
      <NavAdmin></NavAdmin>
      <Row className="admin-container">
        <Col xs="4" className="admin-left-side">
          <AdminLeftside></AdminLeftside>
        </Col>
<<<<<<< HEAD
        <Col
          xs="8"
          className="admin-report-management-rightside admin-right-side"
        >
          <AdminReportManagementRight></AdminReportManagementRight>
          <NavPagination></NavPagination>
=======
        <Col xs="8" className="admin-report-management-rightside admin-right-side">
          <AdminReportManagementRight></AdminReportManagementRight>
>>>>>>> origin/jungYH
        </Col>
      </Row>
    </>
  );
}
