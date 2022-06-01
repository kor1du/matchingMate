import React from "react";
import { Col, Row } from "react-bootstrap";
import "../../css/admin/admin.css";
import AdminLeftside from "../../components/admin/AdminLeftside";
import AdminCategoryAdd from "../../components/admin/adminCategory/AdminCategoryAdd";
import NavAdmin from "../../components/nav/NavAdmin";

export default function adminCategoryAdd() {
  return (
    <>
      <NavAdmin></NavAdmin>
      <Row className="admin-container">
        <Col xs="4" className="admin-left-side">
          <AdminLeftside></AdminLeftside>
        </Col>
        <Col xs="8" className="admin-category-add-rightside admin-right-side">
          <AdminCategoryAdd></AdminCategoryAdd>
        </Col>
      </Row>
    </>
  );
}
