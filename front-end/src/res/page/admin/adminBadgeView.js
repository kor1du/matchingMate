import React from "react";
import { Col, Row } from "react-bootstrap";
import AdminBadgeView from "../../components/admin/AdminBadgeView";
import AdminLeftside from "../../components/admin/AdminLeftside";
import NavAdmin from "../../components/nav/NavAdmin";
import NavPagination from "../../components/nav/NavPagination";

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
          <NavPagination></NavPagination>
        </Col>
      </Row>
    </>
  );
}
