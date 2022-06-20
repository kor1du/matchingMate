import React from "react";
import { Button, Modal } from "react-bootstrap";
import AddressInput from "./ChattingAddress";

export default function ChattingAddressModal(props) {
  const { modalOpen, setModalOpen,setAddress } = props;
  return (
    <Modal show={modalOpen} centered={true} className="input-modal">
      <Modal.Header>
        <p>주소찾기</p>
      </Modal.Header>
      <Modal.Body>
        <AddressInput setAddress={setAddress} setModalOpen={setModalOpen}></AddressInput>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
