import { check } from "prettier";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { axiosPost, axiosPut } from "../../axios/Axios";
import InputModal from "../../Modal/InputModal";
import Crown from "../../../img/crown.png";

export default function ChattingMemberList(props) {
  const roomId = props.roomId;
  const roomHost = props.roomHost;
  const [show, setShow] = useState(false);

  const completeMatching = (e) => {
    const nodes = e.parentNode.parentNode.childNodes;
    if (checkReadyAll(nodes)) {
      setShow(true);
    }
  };
  const checkReadyAll = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText === "준비하기") {
        console.log(nodes[i]);
        return false;
      }
    }
    return true;
  };

  const ready = (member, e) => {
    if (e.innerText === "준비완료") {
      member.ready = false;
      e.innerText = "준비하기";
    } else {
      member.ready = true;
      e.innerText = "준비완료";
    }

    const data = {
      chattingMemberId: member.chattingMemberId,
      ready: member.ready,
    };

    axiosPut("/chat/in", data).catch(function () {
      alert("준비과정에서 오류가 발생했습니다. 잠시후에 다시 시도해주세요.");
    });
  };
  const { member } = props;
  useEffect(() => {}, [show]);
  if (member.chattingMemberId === roomHost) {
    return (
      <>
        <img src={Crown} alt="" style={{ width: "30px" }} />
        <span>{member.nickname}</span>
        <button
          className="btn-ready"
          onClick={(e) => {
            completeMatching(e.target);
          }}
        >
          <p>매칭완료</p>
        </button>
        <br></br>
        <InputModal show={show} setShow={setShow} roomId={roomId}></InputModal>
      </>
    );
  } else {
    return (
      <>
        <span>{member.nickname}</span>
        <button
          className="btn-ready"
          onClick={(e) => {
            ready(member, e.target);
          }}
        >
          {member.ready === true ? "준비완료" : "준비하기"}
        </button>
        <br></br>
      </>
    );
  }
}
