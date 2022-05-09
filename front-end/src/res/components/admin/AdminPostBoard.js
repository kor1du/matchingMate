import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import View from "../../img/view.png";

function viewPostDetail({ post }) {
  console.log(post);
}

export default function AdminPostBoard(props) {
  function Post({ post }) {
    return (
      <>
        <a
          onClick={() => {
            viewPostDetail({ post });
          }}
        >
          <Row className="admin-post-head">
            <Col xs="1">
              <p>{post.id}</p>
            </Col>
            <Col xs="3">
              <p>{post.category}</p>
            </Col>
            <Col xs="4">
              <p>{post.postName}</p>
            </Col>
            <Col xs="4">
              <p>{post.matchingDate}</p>
            </Col>
          </Row>
        </a>
      </>
    );
  }

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { posts } = props;

  if (props != null) {
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
              <p>Category</p>
            </Col>
            <Col xs="4">
              <p>Title</p>
            </Col>
            <Col xs="4">
              <p>Date</p>
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
