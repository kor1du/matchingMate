import React from "react";
import { Col, Row } from "react-bootstrap";
import AdminBadgeAdd from "../../components/admin/adminBadge/AdminBadgeAdd";
import AdminLeftside from "../../components/admin/AdminLeftside";
import NavAdmin from "../../components/nav/NavAdmin";

export default function adminBadgeAdd() {
  return (
    <>
      <NavAdmin></NavAdmin>
      <Row className="admin-container">
        <Col xs="4" className="admin-left-side">
          <AdminLeftside></AdminLeftside>
        </Col>
        <Col xs="8" className="admin-badge-add-rightside admin-right-side">
          <AdminBadgeAdd></AdminBadgeAdd>
        </Col>
      </Row>
    </>
  );
}
