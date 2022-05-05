import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import View from "../../img/view.png";
import { axiosGet } from "../axios/Axios";
import "../../css/adminComponents/adminPostManagementRightside.css";

export default function AdminPostManagement() {
  useEffect(() => {
    axiosGet("/admin/matchingPost").then((data) => {
      console.log(data);
    });
  });

  return (
    <>
      <Button className="admin-post-title">
        <h1>매칭 공고 관리</h1>
      </Button>

      <div className="admin-post-search">
        <img src={View} alt="magnifying-glass" className="icon" />
        <form action="#" className="search">
          <input type="text" className="searchText" />
          <input type="submit" className="searchBtn" value="검색"></input>
        </form>
      </div>
      <div className="admin-post">
        <Row className="admin-post-head">
          <Col xs="1">
            <p>No</p>
          </Col>
          <Col xs="3">
            <p>Category</p>
          </Col>
          <Col xs="4">
            <p>Title</p>
          </Col>
          <Col xs="4">
            <p>Date</p>
          </Col>
        </Row>
        <Row className="admin-post-item">
          <Col xs="1">
            <p>1</p>
          </Col>
          <Col xs="3">
            <p>축구</p>
          </Col>
          <Col xs="4">
            <p>축구한판?</p>
          </Col>
          <Col xs="4">
            <p>2022/02/24</p>
          </Col>
        </Row>
        <Row className="admin-post-item">
          <Col xs="1">
            <p>2</p>
          </Col>
          <Col xs="3">
            <p>배구</p>
          </Col>
          <Col xs="4">
            <p>배구한판?</p>
          </Col>
          <Col xs="4">
            <p>2022/02/24</p>
          </Col>
        </Row>
        <Row className="admin-post-item">
          <Col xs="1">
            <p>3</p>
          </Col>
          <Col xs="3">
            <p>야구</p>
          </Col>
          <Col xs="4">
            <p>야구한판?</p>
          </Col>
          <Col xs="4">
            <p>2022/02/24</p>
          </Col>
        </Row>
        <Row className="admin-post-item">
          <Col xs="1">
            <p>4</p>
          </Col>
          <Col xs="3">
            <p>탁구</p>
          </Col>
          <Col xs="4">
            <p>탁구한판?</p>
          </Col>
          <Col xs="4">
            <p>2022/02/24</p>
          </Col>
        </Row>
        <Row className="admin-post-item">
          <Col xs="1">
            <p>5</p>
          </Col>
          <Col xs="3">
            <p>볼링</p>
          </Col>
          <Col xs="4">
            <p>볼링한판?</p>
          </Col>
          <Col xs="4">
            <p>2022/02/24</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
