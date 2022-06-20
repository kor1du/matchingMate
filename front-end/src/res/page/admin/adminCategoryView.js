import React from "react";
import { Col, Row } from "react-bootstrap";
import "../../css/admin/admin.css";
import AdminLeftside from "../../components/admin/AdminLeftside";
<<<<<<< HEAD
import AdminCategoryView from "../../components/admin/AdminCategoryView";
import NavAdmin from "../../components/Nav/NavAdmin";
import NavPagination from "../../components/Nav/NavPagination";
=======
import AdminCategoryView from "../../components/admin/adminCategory/AdminCategoryView";
import NavAdmin from "../../components/nav/NavAdmin";
>>>>>>> origin/jungYH

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
<<<<<<< HEAD
          <NavPagination></NavPagination>
=======
>>>>>>> origin/jungYH
        </Col>
      </Row>
    </>
  );
}
