import React from "react";
import { Col, Row } from "react-bootstrap";
<<<<<<< HEAD
import AdminBadgeView from "../../components/admin/AdminBadgeView";
import AdminLeftside from "../../components/admin/AdminLeftside";
import NavAdmin from "../../components/Nav/NavAdmin";
import NavPagination from "../../components/Nav/NavPagination";
=======
import AdminBadgeView from "../../components/admin/adminBadge/AdminBadgeView";
import AdminLeftside from "../../components/admin/AdminLeftside";
import NavAdmin from "../../components/nav/NavAdmin";
>>>>>>> origin/jungYH

export default function adminBadgeView() {
  return (
    <>
      <NavAdmin></NavAdmin>
      <Row className="admin-container">
        <Col xs="4" className="admin-left-side">
          <AdminLeftside></AdminLeftside>
        </Col>
        <Col xs="8" className="admin-badge-view-rightside admin-right-side">
          <AdminBadgeView></AdminBadgeView>
<<<<<<< HEAD
          <NavPagination></NavPagination>
=======
>>>>>>> origin/jungYH
        </Col>
      </Row>
    </>
  );
}
