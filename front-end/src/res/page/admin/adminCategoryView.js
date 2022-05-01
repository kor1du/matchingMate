import React from "react";
import { Col, Row } from "react-bootstrap";
import "../../css/admin/admin.css";
import AdminLeftside from "../../components/admin/AdminLeftside";
import AdminCategoryView from "../../components/admin/AdminCategoryView";
import NavAdmin from "../../components/nav/NavAdmin";
import NavPagination from "../../components/nav/NavPagination";

export default function adminCategoryView() {
  return (
    <>
      <NavAdmin></NavAdmin>
      <Row className="admin-container">
        <Col xs="4" className="admin-left-side">
          <AdminLeftside></AdminLeftside>
        </Col>
        <Col xs="8" className="admin-category-view-rightside admin-right-side">
          <AdminCategoryView></AdminCategoryView>
          <NavPagination></NavPagination>
        </Col>
      </Row>
    </>
  );
}
