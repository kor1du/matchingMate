// import { check } from "prettier";
import React, {  useEffect, useState } from "react";
import { Button } from "react-bootstrap";
// import {  axiosPut } from "../../axios/Axios";
import InputModal from "../../Modal/InputModal";
import Crown from "../../../img/crown.png";
import ChattingInfoModal from "./ChattingInfoModal";
import ReportModal from '../../Modal/ReportModal'
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import {  useNavigate } from 'react-router-dom';

export default function ChattingMemberList(props) {
  // const roomId = props.roomId;
  // const roomHost = props.roomHost;
  // const isCompleted = props.isCompleted;
 
  const { stomp, sockJS, numberOfPeople, maxNumberOfPeople, newMessage, roomId, roomHost, isCompleted, myId, chattingMemberId } = props;
  const [ show, setShow] = useState(false);
  const [ infoShow,setInfoShow]=useState(false);

  const [reportShow, setReportShow]=useState(false);

  // const navigate = useNavigate();

  const reportType = "채팅";

  const token = "Bearer " + sessionStorage.getItem("jwtToken");
  
  const openReportModal = () => {
    setReportShow(true);
    console.log("hi")
  };


  const completeMatching = () => {
    if ( maxNumberOfPeople === numberOfPeople ) {
      setShow(true);
    } else {
      alert("아직 모든 멤버가 준비하지 않았습니다.");
    }
  };


  const ready = (e, member) => {
    if (e.innerText === "매칭 참여") {
      member.ready = true;
      e.textContent = "준비 취소";
      e.parentNode.classList.remove("btn-success");
      e.parentNode.classList.add("btn-warning");
    } else {
      member.ready = false;
      e.textContent = "매칭 참여";
      e.parentNode.classList.remove("btn-warning");
      e.parentNode.classList.add("btn-success");
    }

    sendReady();
  };

  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (sockJS.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(stomp, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }

  function sendComplete(place, matchingTime) {
    
    if (place === null || matchingTime === null) {
      alert("빈 값이 존재합니다. 다시 확인해주세요!")
    } else {
      setShow(false);

      waitForConnection(stomp, function () {
        stomp.send(
          "/pub/chat/complete",
          { Authorization: token },
          JSON.stringify({ chattingRoomId:roomId, place:place, matchingTime:matchingTime })
        );
      });
    }
    
  }

  function sendReady() {
    waitForConnection(stomp, function () {
      stomp.send(
        "/pub/chat/ready",
        { Authorization: token },
        JSON.stringify({ ready: member.ready, roomId: roomId, token: token, chattingMemberId:member.chattingMemberId,  })
      );
    });
  }

  const outMember = () => {
    
    if (confirm("정말 [" + member.nickname + "] 님을 강퇴하시겠습니까?")) {
      // navigate("/chat", {state:{isDarkMode:isDarkMode}});

      waitForConnection(stomp, function () {
          stomp.send(
            "/pub/chat/out",
            { Authorization: token },
            JSON.stringify({ chattingRoomId:roomId, chattingMemberId:chattingMemberId })
          );
      });
    }
  }


  useEffect(() => {
  },[newMessage])

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
              (
                member.memberId === myId 
              ? 
                (
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
                    sendComplete={sendComplete}
                    setShow={setShow}
                    roomId={roomId}
                  />
                </div>
                )
              :
                <p>매칭 완료 대기 중</p>
              )
          :
          null
          }
          
          <div className="priority">
            <img src={Crown} className="host-crown-img" alt="" />
          </div>
        </div>
        <ChattingInfoModal infoShow={infoShow} setInfoShow={setInfoShow} member={member}></ChattingInfoModal>
        <ReportModal infoShow={reportShow} setInfoShow={setReportShow} memberNickname={member.nickname} reportType={reportType} targetId={null} />
      </>
    );
  } else {
    return (
      <div className="member">
        <div className="report-icon">
      { member.memberId===myId ? null : <span onClick={() => { openReportModal(); }}><NotificationImportantIcon sx={{color:"red", width:25}}  /></span>  }
      { roomHost===myId && isCompleted===0 ? <span><RemoveCircleOutlineIcon onClick={() => { outMember(); }} /></span> : null }
      </div>
        <img src={member.profileImgAddress} className="profile-img" alt="" onClick={(e)=>{e.preventDefault();popupMemberInfo()}}/>
        <div className="member-nickname">
          <span>{member.nickname}</span>
        </div>
        {
          isCompleted===0 ? (
                  (member.ready === false) ? 
                    (member.memberId === myId ? 
                      
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
                        <p className="ready-text">매칭 참여</p>
                      </Button>
                      
                    :
                      <p>준비 중</p>
                    )
                  : 
                  (
                    (member.memberId === myId ? 
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
                        <p className="ready-text">준비 취소</p>
                      </Button>
                      )
                      :
                      <p>준비 완료</p>
                    )
                  )
          )
          :
                null
        }
        <div className="priority">
          {member.priority===2?<h4 className="me">나</h4>: null}
        </div>
        <ChattingInfoModal infoShow={infoShow} setInfoShow={setInfoShow} member={member}></ChattingInfoModal>
        <ReportModal infoShow={reportShow} setInfoShow={setReportShow} memberNickname={member.nickname} reportType={reportType} targetId={null} />
      </div>
    );
    
  }


}
