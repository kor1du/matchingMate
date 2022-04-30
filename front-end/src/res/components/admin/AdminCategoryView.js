import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import "../../css/adminComponents/adminCategoryViewRightside.css";
import Soccer from "../../img/soccer.png";
import { BsFillTrashFill } from "react-icons/bs";
import { FaWrench } from "react-icons/fa";
import { Link } from "react-router-dom";

function deleteItem(event) {
  event.preventDefault();
  confirm("아이템을 지우시겠습니까?");
}

export default function AdminCategoryView() {
  return (
    <>
      <div className="title-box">
        <Button className="title" variant="warning">
          <h1>카테고리조회</h1>
        </Button>
      </div>
      <div className="category-box">
        <Row className="category">
          <Col lg="3" xs="6" className="category-item">
            <img src={Soccer} alt="soccer-ball" className="icon" />
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
          <Col lg="3" xs="6" className="category-item">
            <img src={Soccer} alt="soccer-ball" className="icon" />
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
          <Col lg="3" xs="6" className="category-item">
            <img src={Soccer} alt="soccer-ball" className="icon" />
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
          <Col lg="3" xs="6" className="category-item">
            <img src={Soccer} alt="soccer-ball" className="icon" />
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
        <Row className="category">
          <Col lg="3" xs="6" className="category-item">
            <img src={Soccer} alt="soccer-ball" className="icon" />
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
          <Col lg="3" xs="6" className="category-item">
            <img src={Soccer} alt="soccer-ball" className="icon" />
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
          <Col lg="3" xs="6" className="category-item">
            <img src={Soccer} alt="soccer-ball" className="icon" />
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
          <Col lg="3" xs="6" className="category-item">
            <img src={Soccer} alt="soccer-ball" className="icon" />
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
