import React from "react";
import { Button } from "react-bootstrap";
import "./pagination.css";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <div className="pagination">
      <Button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        variant="dark"
      >
        <p>&lt;</p>
      </Button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <Button
            className="active"
            variant="danger"
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            <p>{i + 1}</p>
          </Button>
        ))}
      <Button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        variant="dark"
      >
        <p>&gt;</p>
      </Button>
    </div>
  );
}

export default Pagination;
