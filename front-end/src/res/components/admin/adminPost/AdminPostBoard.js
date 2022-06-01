import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Pagination from "../../pagination/Pagination";
import "../../../css/adminComponents/adminReportBoard.css";

import View from "../../../img/view.png";
export default function AdminPostBoard(props) {
  function Post({ post }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <a onClick={handleShow}>
          <Row className="admin-post-head">
            <Col xs="1">
              <p>{post.id}</p>
            </Col>
            <Col xs="3">
              <p>{post.categoryName}</p>
            </Col>
            <Col xs="4">
              <p>{post.postName}</p>
            </Col>
            <Col xs="4">
              <p>{post.matchingDate}</p>
            </Col>
          </Row>
        </a>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>매칭공고 상세보기</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="modal-post">카테고리 : {post.categoryName}</p>
            <p className="modal-post">제목 : {post.postName}</p>
            <p className="modal-post">내용 : {post.postContents}</p>
            <p className="modal-post">등록날짜 : {post.matchingDate}</p>
            <p className="modal-post">작성자 : {post.nickname}</p>
            <p className="modal-post">운동장소 : {post.place}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              <p>삭제</p>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { posts } = props;

  if (props != null) {
    console.log(posts);
    return (
      <>
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
              <p>카테고리</p>
            </Col>
            <Col xs="4">
              <p>제목</p>
            </Col>
            <Col xs="4">
              <p>날짜</p>
            </Col>
          </Row>
          <Row className="admin-post-item"></Row>
          {posts.slice(offset, offset + limit).map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </div>
        <Pagination total={posts.length} limit={limit} page={page} setPage={setPage} />
      </>
    );
  }
}
