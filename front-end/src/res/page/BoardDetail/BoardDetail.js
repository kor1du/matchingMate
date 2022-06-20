<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import styles from './BoardDetail.module.css';
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import Nav from '../../components/nav/Nav';
=======
import React, { useEffect, useState } from "react";
import styles from "./BoardDetail.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Nav from "../../components/nav/Nav";
>>>>>>> origin/junwoo7
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "react-bootstrap";
// import { axiosGet } from '../../axios/Axios';
import Modal from "react-modal";
<<<<<<< HEAD
import axios from 'axios';
// import GoogleMap from '../../components/googleMap/googleMap';
import { axiosDelete } from '../../components/axios/Axios';
import BoardReport from '../../components/home-board/BoardReport';
import KakaoMap from '../../components/googleMap/kakaoMap';

=======
import axios from "axios";
// import GoogleMap from '../../components/googleMap/googleMap';
import { axiosDelete } from "../../components/axios/Axios";
import BoardReport from "../../components/home-board/BoardReport";
import KakaoMap from "../../components/googleMap/kakaoMap";
import ReportModal from '../../components/Modal/ReportModal';
>>>>>>> origin/junwoo7

const BoardDetail = () => {
  const { id } = useParams();
  console.log("detail id : ", id);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const { categorys } = useLocation().state;

<<<<<<< HEAD
=======
  const reportType = "매칭공고";

>>>>>>> origin/junwoo7
  const token = sessionStorage.getItem("jwtToken");
  console.log("token : ", token);

  const [reportShow, setReportShow] = useState(false);
  const [reportInfo, setReportInfo] = useState({
    targetId: id,
    targetNickname: "기본값",
    targetMemberNickname: "기본값",
    reportType: "매칭공고",
    reportClassify: "",
    contents: "",
  });

<<<<<<< HEAD

=======
>>>>>>> origin/junwoo7
  const handleReport = (e) => {
    e.preventDefault();

    console.log("신고 보내는 데이터", reportInfo);

<<<<<<< HEAD
    axios.post('http://localhost:8080/report/create', reportInfo, {
      headers: {
        'Authorization': "Bearer " + token
      }
    }).catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      }
      else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
      }
    });
=======
    axios
      .post(" https://2adb-60-253-18-218.jp.ngrok.io/report/create", reportInfo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((error) => {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
      });
>>>>>>> origin/junwoo7
    alert("신고 완료되었습니다.");
    navigate(-1);
  };

  const handleInChat = (e) => {
    e.preventDefault();

<<<<<<< HEAD
  const handleInChat = (e) => {
    e.preventDefault();

    if(!board.myPost) {
      console.log("채팅 가입하기할떄 매칭포스트아이디 : ",id)

      axios.post('http://localhost:8080/matchingPost/detail/joinChat', {chattingRoomId : board.chattingRoomId}, {
        headers: {
          'Authorization': "Bearer " + token
        }
      }).catch((error) => {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        }
        else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
      });
    }
    navigate("/chat/in/"+board.chattingRoomId, {state:{ roomId:board.chattingRoomId}});
  }
=======
    if (!board.myPost) {
      console.log("채팅 가입하기할떄 매칭포스트아이디 : ", id);

      axios
        .post(
          " https://2adb-60-253-18-218.jp.ngrok.io/matchingPost/detail/joinChat",
          { chattingRoomId: board.chattingRoomId },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .catch((error) => {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log("Error", error.message);
          }
        });
    }
    navigate("/chat/in/" + board.chattingRoomId, { state: { roomId: board.chattingRoomId } });
  };
>>>>>>> origin/junwoo7

  const boardDelete = () => {
    axiosDelete(`/matchingPost/detail/delete/${id}`);
    alert("삭제 완료되었습니다.");
    navigate("/");
  };

  const getBoard = async () => {
    const res = await (
      await axios.get(` https://2adb-60-253-18-218.jp.ngrok.io/matchingPost/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    //const res = await (await axiosGet(`matchingPost/detail/${id}`, header)).data; // 이코드하면 에러뜸

    console.log("detail 조회 결과", res);
<<<<<<< HEAD
    
=======

>>>>>>> origin/junwoo7
    setReportInfo({ ...reportInfo, targetMemberNickname: res.data.nickname, targetNickname: res.data.nickname });
    setBoard(res.data);

    setisLoading(false);
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <>
      <Nav />
      {isLoading === true ? (
        <h2>로딩중입니다 ...</h2>
      ) : (
        <div className={styles.container}>
          <section className={styles.header}>
            <BsArrowLeft className={styles.backBtn} size="40" onClick={() => navigate(-1)}></BsArrowLeft>
            <div className={styles.title}>{board.postName}</div>
            <div className={styles.userAndDate}>
              <div className={styles.nickName}>{board.nickname}</div>
              <div className={styles.registerDate}>
                <div>{board.registerDatetime}</div>
                {!board.myPost && (
                  <div>
                    <Button variant="outlined" onClick={() => setReportShow(true)}>
                      신고
                    </Button>
                  </div>
                )}
              </div>
              <ReportModal infoShow={reportShow} setInfoShow={setReportShow} memberNickname={board.nickname} reportType={reportType} targetId={id} />
            </div>
            {/* <Modal
              isOpen={reportModalOpen}
              ariaHideApp={false}
              shouldFocusAfterRender={true}
              onRequestClose={() => setReportModalOpen(false)}
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(126, 147, 149, 0.83)",
                },
                content: {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  border: "1px solid #ccc",
                  background: "#fff",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "4px",
                  outline: "none",
                  padding: "20px",
                  width: "800px",
                  height: "800px",
                },
              }}
            >
<<<<<<< HEAD
              <KakaoMap lat={board.lat} lng={board.lng} />
              {/* <GoogleMap lat={board.lat} lng={board.lng} /> */}
              <button onClick={() => setModalOpen(false)}>닫기</button>
            </Modal>

            <div className={styles.contentBox}>
              <h2 className={styles.contentHeader}>상세내용</h2>
              <div className={styles.contentWrap}>
                <p className={styles.contentText}>{board.postContents}</p>
              </div>
            </div>
            <div className={styles.chatBtnBox}>
              {
                board.inChatNumber === board.maxNumberOfPeople ?
                  <Button>현재 채팅방이 가득 찼어요</Button>
                  :
                  <Button onClick={(e)=> handleInChat(e)}>채팅방 참여하기</Button>
              }
              {
                (board.myPost) &&
                <div className={styles.myBtn}>
                  <Button onClick={() => {
                    navigate('/register', {
=======
              <BoardReport reportInfo={reportInfo} setReportInfo={setReportInfo} handleReport={handleReport} />
              <button onClick={() => setReportModalOpen(false)}>닫기</button>
              <button onClick={handleReport}>등록</button>
            </Modal> */}
            <ul className={styles.boardInfo}>
              <li className={styles.infoBox}>
                <span className={styles.infoTitle}>종목</span>
                <span className={styles.infoContent}>{board.categoryName}</span>
              </li>
              <li className={styles.infoBox}>
                <span className={styles.infoTitle}>운동 예정일</span>
                <span className={styles.infoContent}>{board.matchingDate}</span>
              </li>
              <li className={styles.infoBox}>
                <span className={styles.infoTitle}>운동 시작시간</span>
                <span className={styles.infoContent}>{board.matchingTime}</span>
              </li>
              <li className={styles.infoBox}>
                <span className={styles.infoTitle}>장소</span>
                <span className={styles.infoContent}>{board.place}</span>
                <Button onClick={() => setModalOpen(true)}>지도 보기</Button>
              </li>
              <li className={styles.infoBox}>
                <span className={styles.infoTitle}>추천 실력</span>
                <span className={styles.infoContent}>{board.recommendedSkill}</span>
              </li>
            </ul>
          </section>
          <Modal
            isOpen={modalOpen}
            ariaHideApp={false}
            shouldFocusAfterRender={true}
            onRequestClose={() => setModalOpen(false)}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(126, 147, 149, 0.83)",
              },
              content: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px solid #ccc",
                background: "#fff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "20px",
                width: "800px",
                height: "800px",
              },
            }}
          >
            <KakaoMap lat={board.lat} lng={board.lng} />
            {/* <GoogleMap lat={board.lat} lng={board.lng} /> */}
            <button onClick={() => setModalOpen(false)}>닫기</button>
          </Modal>

          <div className={styles.contentBox}>
            <h2 className={styles.contentHeader}>상세내용</h2>
            <div className={styles.contentWrap}>
              <p className={styles.contentText}>{board.postContents}</p>
            </div>
          </div>
          <div className={styles.chatBtnBox}>
            {board.inChatNumber === board.maxNumberOfPeople ? (
              <Button>현재 채팅방이 가득 찼어요</Button>
            ) : (
              <Button onClick={(e) => handleInChat(e)}>채팅방 참여하기</Button>
            )}
            {board.myPost && (
              <div className={styles.myBtn}>
                <Button
                  onClick={() => {
                    navigate("/register", {
>>>>>>> origin/junwoo7
                      state: {
                        board,
                        categorys,
                        id,
                        api: "update",
                      },
                    });
                  }}
                >
                  수정
                </Button>

<<<<<<< HEAD
                  <Button onClick={() => boardDelete()}>삭제</Button>
                </div>
              }
              
            </div>
=======
                <Button onClick={() => boardDelete()}>삭제</Button>
              </div>
            )}
>>>>>>> origin/junwoo7
          </div>
        </div>
      )}
    </>
  );
};

export default BoardDetail;
