import React, { useEffect } from 'react';
import styles from './BoardDetail.module.css';
import { useNavigate, useParams } from "react-router-dom";
import Nav from '../../components/nav/Nav';
import { BsArrowLeft } from "react-icons/bs";
import { Button } from 'react-bootstrap';
// import { axiosGet } from '../../axios/Axios';


const BoardDetail = () => {

  const { id } = useParams();
  console.log("detail id : ", id);

  const navigate = useNavigate();
  // const [board, setBoard] = useState();

  // const getBoard = async () => {
  //   const res = await (await axiosGet(`/matchingPost/detail/${id}`)).data;
  //   console.log("통신데이터", res);
  //   setBoard(res.data);
  // };

  useEffect(() => {
    // getBoard();
  }, []);

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <section className={styles.header}>
          <BsArrowLeft className={styles.backBtn} size="40" onClick={() => navigate(-1)}></BsArrowLeft>
          <h1>제목 : 제목입니다.</h1>
          <div>
            <p>userId</p>
            <p>종목 ?</p>
            <p>시간 ?</p>
            <div>
              <span>장소 ?</span>
              <Button>지도 보기</Button>
            </div>
            <p>추천 실력 ?</p>
          </div>
        </section>
        <div className={styles.contentBox}>

          <p>내용~~~~~~~~~~~~</p>
        </div>
      </div>
    </>

  );
};

export default BoardDetail;