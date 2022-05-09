import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { axiosPost } from "../axios/Axios";

export default function CheckID(props) {
  // const [tmpId, setTmpId] = useState("");
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function check() {
    const data = {
      userId: id,
    };

    axiosPost("/signUp/checkId", data)
      .then(() => {
        console.log("ID사용가능");
        props.setId(id);
      })
      .catch((error) => {
        alert("중복된 ID입니다 다른 ID를 사용해주세요!");
        props.setId("");
      });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn-id-check">
        <p>ID 중복확인</p>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>ID 중복확인</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-id-check-body">
          <input
            className="id-chk-input"
            type="text"
            placeholder="ID를 입력해주세요."
            onChange={(e) => {
              e.preventDefault();
              setId(e.target.value);
            }}
          />
          <Button onClick={check} className="btn-id-check">
            <p>중복확인</p>
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
