import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import View from "../../img/view.png";
import "../../css/adminComponents/adminReportManagementRightside.css";

export default function AdminReportManagement() {
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
        <Row className="admin-report-head">
          <Col xs="1">
            <p>No</p>
          </Col>
          <Col xs="3">
            <p>Category</p>
          </Col>
          <Col xs="4">
            <p>제보자</p>
          </Col>
          <Col xs="4">
            <p>Date</p>
          </Col>
        </Row>
        <Row className="admin-report-item">
          <Col xs="1">
            <p>1</p>
          </Col>
          <Col xs="3">
            <p>비매너채팅</p>
          </Col>
          <Col xs="4">
            <p>유저1</p>
          </Col>
          <Col xs="4">
            <p>2022/02/24</p>
          </Col>
        </Row>
        <Row className="admin-report-item">
          <Col xs="1">
            <p>2</p>
          </Col>
          <Col xs="3">
            <p>무단불참</p>
          </Col>
          <Col xs="4">
            <p>유저2</p>
          </Col>
          <Col xs="4">
            <p>2022/02/24</p>
          </Col>
        </Row>
        <Row className="admin-report-item">
          <Col xs="1">
            <p>3</p>
          </Col>
          <Col xs="3">
            <p>음란채팅</p>
          </Col>
          <Col xs="4">
            <p>유저5</p>
          </Col>
          <Col xs="4">
            <p>2022/02/24</p>
          </Col>
        </Row>
        <Row className="admin-report-item">
          <Col xs="1">
            <p>4</p>
          </Col>
          <Col xs="3">
            <p>음란채팅</p>
          </Col>
          <Col xs="4">
            <p>유저8</p>
          </Col>
          <Col xs="4">
            <p>2022/02/24</p>
          </Col>
        </Row>
        <Row className="admin-report-item">
          <Col xs="1">
            <p>5</p>
          </Col>
          <Col xs="3">
            <p>무단불참</p>
          </Col>
          <Col xs="4">
            <p>유저6</p>
          </Col>
          <Col xs="4">
            <p>2022/02/24</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
