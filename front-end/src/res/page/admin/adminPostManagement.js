import React from "react";
import { Col, Row } from "react-bootstrap";
import "../../css/admin/admin.css";
import AdminLeftside from "../../components/admin/AdminLeftside";
import AdminPostManagementRight from "../../components/admin/AdminPostManagement";
import NavAdmin from "../../components/nav/NavAdmin";


export default function AdminPostManagement() {
  return (
    <>
      <NavAdmin></NavAdmin>
      <Row className="admin-container">
        <Col xs="4" className="admin-left-side">
          <AdminLeftside></AdminLeftside>
        </Col>
        <Col xs="8" className="admin-post-management-rightside admin-right-side">
          <AdminPostManagementRight></AdminPostManagementRight>
        </Col>
      </Row>
    </>
  );
}
