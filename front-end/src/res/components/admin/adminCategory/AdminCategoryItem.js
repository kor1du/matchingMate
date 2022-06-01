import axios from "axios";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { FaWrench } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../../css/adminComponents/adminCategoryViewRightside.css";
import Pagination from "../../pagination/Pagination";

export function AdminCategoryItem({ categorys }) {
  function Item({ category }) {
    const url = `/admin/modify?id=${category.id}&name=${category.name}&img=${category.imgAddress}`;
    return (
      <Col lg="3" xs="6" className="category-item">
        <img src={category.imgAddress} alt="soccer-ball" className="icon" />
        <div className="repairAndDelete">
          <Link to={url}>
            <FaWrench className="modify right-icon" />
          </Link>
          <BsFillTrashFill
            className="delete right-icon"
            onClick={(e) => {
              e.preventDefault();
              deleteItem(category.id);
            }}
          />
        </div>
      </Col>
    );
  }

  function deleteItem(id) {
    const url = "http://localhost:8080/admin/category/delete/" + id;
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

  if (categorys) {
    return (
      <div className="category-box">
        <Row>
          {categorys.slice(offset, offset + limit).map((category) => {
            return <Item key={category.id} category={category}></Item>;
          })}
        </Row>
        <Pagination
          total={categorys.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    );
  }
}
