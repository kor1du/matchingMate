import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddressInput from "../Modal/Address";

export default function AddressModal(props) {
  const [show, setShow] = useState(false);
   const { setAddress } = props;

  const handleShow = ()=>setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        주소찾기
      </Button>
      <Modal show={show} centered={true} className="input-modal">
        <Modal.Header>
          <p>주소찾기</p>
        </Modal.Header>
        <Modal.Body>
          <AddressInput
            setAddress={setAddress}
            setShow={setShow}
          ></AddressInput>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
