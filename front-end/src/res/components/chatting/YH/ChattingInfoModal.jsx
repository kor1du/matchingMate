import React from "react";
import { Button, Modal } from "react-bootstrap";
import '../../../css/chatting/chattingInfoModal.css'

export default function ChattingInfoModal(props) {
  const { infoShow, setInfoShow, member } = props;

  if (member)
    return (
      <Modal show={infoShow} centered={true}>
          <Modal.Header>
            <p>{member.nickname}님의 프로필</p>
          </Modal.Header>
          <Modal.Body>
            <p>평점 : {member.avgSkillPoint}</p>
            <p>매너점수 : {member.avgMannerPoint}</p>
            <p>한줄소개 : 잘부탁드립니다!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setInfoShow(false);
              }}
            >
              닫기
            </Button>
          </Modal.Footer>
      </Modal>
    );
}
