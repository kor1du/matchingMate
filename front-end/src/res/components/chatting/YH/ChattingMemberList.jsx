// import { check } from "prettier";
import React, {  useState } from "react";
import { Button } from "react-bootstrap";
import {  axiosPut } from "../../axios/Axios";
import InputModal from "../../Modal/InputModal";
import Crown from "../../../img/crown.png";
import ChattingInfoModal from "./ChattingInfoModal";
import ReportModal from '../../Modal/ReportModal'
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

export default function ChattingMemberList(props) {
  // const roomId = props.roomId;
  // const roomHost = props.roomHost;
  // const isCompleted = props.isCompleted;

  const {roomId, roomHost, isCompleted, myId} = props;
  const [show, setShow] = useState(false);
  const [infoShow,setInfoShow]=useState(false);

  const [reportShow, setReportShow]=useState(false);
  const reportType = "채팅";
  
  const openReportModal = () => {
    setReportShow(true);
  };


  const completeMatching = () => {
    const members=document.querySelectorAll(".btn-ready");
    if (checkReadyAll(members)) {
      setShow(true);
    } else {
      alert("아직 모든 멤버가 준비하지 않았습니다.");
    }
  };
  const checkReadyAll = (members) => {
    for (let i = 0; i < members.length; i++) {
      if (members[i].innerText === "준비하기") {
        return false;
      }
    }
    return true;
  };

  const ready = (e, member) => {
    if (e.innerText === "준비완료") {
      member.ready = false;
      e.textContent = "준비하기";
      e.parentNode.classList.remove("btn-success");
      e.parentNode.classList.add("btn-warning");
    } else {
      member.ready = true;
      e.textContent = "준비완료";
      e.parentNode.classList.remove("btn-warning");
      e.parentNode.classList.add("btn-success");
    }

    const data = {
      chattingMemberId: member.chattingMemberId,
      ready: member.ready,
    };

    axiosPut("/chat/in", data).catch(function () {
      alert("준비과정에서 오류가 발생했습니다. 잠시후에 다시 시도해주세요.");
    });
  };

  const popupMemberInfo=()=>{
    setInfoShow(true);
  }
  const { member } = props;

  if (member.memberId === roomHost) {
    return (
      <>
        <div className="host">
        <div className="report-icon">
          { member.memberId === myId ? null : <span onClick={() => { openReportModal(); }}><NotificationImportantIcon sx={{color:"red", width:25}}  /></span> } 
          </div>            
          <img src={member.profileImgAddress} className="profile-img" alt="" onClick={(e)=>{e.preventDefault();popupMemberInfo()}}/>
          <div className="member-nickname">
            <span>{member.nickname}</span>
          </div>

          {
            isCompleted===0 ? 
            <div>
            <Button
            className="btn-start"
            onClick={(e) => {
              e.preventDefault();
              completeMatching();
            }}
          >
            <p>매칭완료</p>
          </Button>

          <InputModal
            show={show}
            setShow={setShow}
            roomId={roomId}
          />
          </div>
          :
          null
          }
          
          {/* <InputModal
            show={show}
            setShow={setShow}
            roomId={roomId}
          /> */}
          <div className="priority">
            <img src={Crown} className="host-crown-img" alt="" />
          </div>
        </div>
        <ChattingInfoModal infoShow={infoShow} setInfoShow={setInfoShow} member={member}></ChattingInfoModal>
      </>
    );
  } else {
    return (
      <div className="member">
        <div className="report-icon">
      {member.memberId===myId ? null : <span onClick={() => { openReportModal(); }}><NotificationImportantIcon sx={{color:"red", width:25}}  /></span>  }
      </div>
        <img src={member.profileImgAddress} className="profile-img" alt="" onClick={(e)=>{e.preventDefault();popupMemberInfo()}}/>
        <div className="member-nickname">
          <span>{member.nickname}</span>
        </div>
        {
          isCompleted===0 ? (
                  (member.ready === true) ? (
                    <Button
                      className="btn-ready"
                      variant="success"
                      onClick={(e) => {
                        e.preventDefault();
                        if(e.target.tagName==='P')
                        ready(e.target, member);
                        else
                        ready(e.target.childNodes[0],member)
                      }}
                    >
                      <p className="ready-text">준비완료</p>
                    </Button>
                  ) 
                  : 
                  (
                    <Button
                      className="btn-ready"
                      variant="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        if(e.target.tagName==='P')
                        ready(e.target, member);
                        else
                        ready(e.target.childNodes[0],member)
                      }}
                    >
                      <p className="ready-text">준비하기</p>
                    </Button>
                  )
          )
          :
                null
        }
        <div className="priority">
          {member.priority===2?<h4 className="me">나</h4>: null}
        </div>
        <ChattingInfoModal infoShow={infoShow} setInfoShow={setInfoShow} member={member}></ChattingInfoModal>
        <ReportModal infoShow={reportShow} setInfoShow={setReportShow} memberNi1ckname={member.nickname} reportType={reportType} targetId={null} />
      </div>
    );
  }
}
