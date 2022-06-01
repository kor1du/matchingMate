import axios from "axios";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { FaWrench } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../../pagination/Pagination";

export function AdminbadgeItem({ badges }) {
  function Item({ badge }) {
    const url = `/admin/badge/modify?id=${badge.id}&count=${badge.overMatchingCount}&img=${badge.imgAddress}`;
    return (
      <Col lg="3" xs="6" className="badge-item">
        <img src={badge.imgAddress} alt="soccer-ball" className="icon" />
        <div className="repairAndDelete">
          <Link to={url}>
            <FaWrench className="modify right-icon" />
          </Link>
          <BsFillTrashFill
            className="delete right-icon"
            onClick={(e) => {
              e.preventDefault();
              deleteItem(badge.id);
            }}
          />
        </div>
      </Col>
    );
  }

  function deleteItem(id) {
    const url = "http://localhost:8080/admin/badge/delete/" + id;
    if (confirm("삭제하시겠습니까?")) {
      axios.delete(url).then(() => {
        location.reload();
        alert("삭제완료!");
      });
    } else alert("삭제를 취소했습니다!");
  }

  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  if (badges) {
    return (
      <div className="badge-box">
        <Row>
          {badges.slice(offset, offset + limit).map((badge) => {
            return <Item key={badge.id} badge={badge}></Item>;
          })}
        </Row>
        <Pagination total={badges.length} limit={limit} page={page} setPage={setPage} />
      </div>
    );
  }
}
