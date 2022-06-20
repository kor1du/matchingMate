import { React, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/home-board/homeBoardCreate.css";

export default function HomeBoardCreate() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="make-post">
        <Button
          variant="secondary"
          onClick={handleShow}
          className="board-detail-btn"
        >
          방만들기
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>이건 나중에</Modal.Title>
        </Modal.Header>
        <Modal.Body>데이터 불러오면서 수정하게 해야 할듯</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
