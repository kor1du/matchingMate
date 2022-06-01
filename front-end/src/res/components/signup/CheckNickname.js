import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { axiosPost } from "../axios/Axios";

export default function CheckNickname(props) {
  // const [tmpNickname, setTmpNickname] = useState("");
  const [nickname, setNickname] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function check() {
    const data = {
      nickname: nickname,
    };

    axiosPost("/signUp/checkNickname", data)
      .then(() => {
        console.log("닉네임 사용가능");
        props.setNickname(nickname);
        setShow(false);
      })
      .catch(() => {
        alert("중복된 닉네임 입니다 다른 닉네임을 사용해주세요!");
        props.setNickname("");
      });
  }

  return (
    <>
      <Button variant="success" onClick={handleShow} className="btn-id-check">
        <p>별명 중복 확인</p>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="modal-check-header">
          <Modal.Title>
            <p>별명 중복확인</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-check-body">
          <input
            className="id-chk-input"
            type="text"
            placeholder="별명을 입력해주세요."
            onChange={(e) => {
              e.preventDefault();
              setNickname(e.target.value);
            }}
          />
          <Button variant="dark" onClick={check} className="btn-id-check">
            <p>중복확인</p>
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
