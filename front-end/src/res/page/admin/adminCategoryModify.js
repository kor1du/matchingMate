import React from "react";
import { Col, Row } from "react-bootstrap";
import "../../css/admin/admin.css";
import AdminLeftside from "../../components/admin/AdminLeftside";
import AdminCategoryModify from "../../components/admin/adminCategory/AdminCategoryModify";
import NavAdmin from "../../components/nav/NavAdmin";

export default function adminCategoryModify() {
  return (
    <>
      <NavAdmin></NavAdmin>
      <Row className="admin-container">
        <Col xs="4" className="admin-left-side">
          <AdminLeftside></AdminLeftside>
        </Col>
        <Col xs="8" className="admin-category-modify-rightside admin-right-side">
          <AdminCategoryModify></AdminCategoryModify>
        </Col>
      </Row>
    </>
  );
}
