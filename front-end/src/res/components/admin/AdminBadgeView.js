import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import "../../css/adminComponents/adminBadgeViewRightside.css";
import { DiGithubBadge } from "react-icons/di";
import { BsFillTrashFill } from "react-icons/bs";
import { FaWrench } from "react-icons/fa";
import { Link } from "react-router-dom";

function deleteItem(event) {
  event.preventDefault();
  confirm("아이템을 지우시겠습니까?");
}

export default function AdminBadgeView() {
  return (
    <>
      <div className="title-box">
        <Button className="title" variant="success">
          <h1>뱃지조회</h1>
        </Button>
      </div>
      <div className="badge-box">
        <Row className="badge">
          <Col lg="3" xs="6" className="badge-item">
            <DiGithubBadge className="icon" />
            <div className="repairAndDelete">
              <Link to="/admin/badge/modify">
                <FaWrench className="modify right-icon" />
              </Link>
              <BsFillTrashFill
                className="delete right-icon"
                onClick={deleteItem}
              />
            </div>
          </Col>
          <Col lg="3" xs="6" className="badge-item">
            <DiGithubBadge className="icon" />
            <div className="repairAndDelete">
              <Link to="/admin/category/modify">
                <FaWrench className="modify right-icon" />
              </Link>
              <BsFillTrashFill
                className="delete right-icon"
                onClick={deleteItem}
              />
            </div>
          </Col>
          <Col lg="3" xs="6" className="badge-item">
            <DiGithubBadge className="icon" />
            <div className="repairAndDelete">
              <Link to="/admin/category/modify">
                <FaWrench className="modify right-icon" />
              </Link>
              <BsFillTrashFill
                className="delete right-icon"
                onClick={deleteItem}
              />
            </div>
          </Col>
          <Col lg="3" xs="6" className="badge-item">
            <DiGithubBadge className="icon" />
            <div className="repairAndDelete">
              <Link to="/admin/category/modify">
                <FaWrench className="modify right-icon" />
              </Link>
              <BsFillTrashFill
                className="delete right-icon"
                onClick={deleteItem}
              />
            </div>
          </Col>
        </Row>
        <Row className="badge">
          <Col lg="3" xs="6" className="badge-item">
            <DiGithubBadge className="icon" />
            <div className="repairAndDelete">
              <Link to="/admin/category/modify">
                <FaWrench className="modify right-icon" />
              </Link>
              <BsFillTrashFill
                className="delete right-icon"
                onClick={deleteItem}
              />
            </div>
          </Col>
          <Col lg="3" xs="6" className="badge-item">
            <DiGithubBadge className="icon" />
            <div className="repairAndDelete">
              <Link to="/admin/category/modify">
                <FaWrench className="modify right-icon" />
              </Link>
              <BsFillTrashFill
                className="delete right-icon"
                onClick={deleteItem}
              />
            </div>
          </Col>
          <Col lg="3" xs="6" className="badge-item">
            <DiGithubBadge className="icon" />
            <div className="repairAndDelete">
              <Link to="/admin/category/modify">
                <FaWrench className="modify right-icon" />
              </Link>
              <BsFillTrashFill
                className="delete right-icon"
                onClick={deleteItem}
              />
            </div>
          </Col>
          <Col lg="3" xs="6" className="badge-item">
            <DiGithubBadge className="icon" />
            <div className="repairAndDelete">
              <Link to="/admin/category/modify">
                <FaWrench className="modify right-icon" />
              </Link>
              <BsFillTrashFill
                className="delete right-icon"
                onClick={deleteItem}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
