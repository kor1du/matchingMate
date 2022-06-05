import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import HistoryMateItem from "./historyMateItem";
import "./historyMateModal.css";

export default function historyMateModal(props) {
  const [show, setShow] = useState(false);
  const { matchingMatesInfo, matchingHistoryId } = props;

  useEffect(() => {}, [props]);

  const handleShow = () => setShow(true);
  if (matchingMatesInfo)
    return (
      <>
        <label
          onClick={() => {
            handleShow();
          }}
        >
          더보기
        </label>
        <Modal show={show} centered={true} className="modal-matching-mate">
          <Modal.Header>
            <p>매칭메이트 목록</p>
          </Modal.Header>
          <Modal.Body>
            {matchingMatesInfo.map((matchingMate) => (
              <HistoryMateItem
                key={matchingMate.id}
                matchingMate={matchingMate}
                matchingHistoryId={matchingHistoryId}
              />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
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
