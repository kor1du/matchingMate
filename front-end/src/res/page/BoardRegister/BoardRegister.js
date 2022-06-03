import React, { useState } from 'react';
import styles from './BoardRegister.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from 'react-icons/fc';
import TimeInput from "react-input-time";
import { TextField } from '@mui/material';
import Modal from "react-modal";
import BoardPlaceInput from '../../components/home-board/BoardPlaceInput';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
// import moment from 'moment';

const BoardRegister = () => {

  const { liveAddr, categorys, board, id, api } = useLocation().state;
  console.log("state 잘 전달 받았나요 ? :", liveAddr, categorys);

  console.log("수정시 board 받앗나요 ? ? :", board);

  const navigate = useNavigate();


  const [postInfo, setPostInfo] = useState({
    postName: board ? board.postName : '',
    postContents: board ? board.postContents : '',
    categoryId: board ? board.categoryId : '',
    categoryName: board ? board.categoryName : '',
    maxNumberOfPeople: board ? board.maxNumberOfPeople : '',
    matchingDate: board ? new Date(board.matchingDate) : new Date(),
    matchingTime: board ? board.matchingTime : '00:00',
    place: board ? board.place : '',
    recommendedSkill: board ? board.recommendedSkill : ''
  });

  const token = sessionStorage.getItem("jwtToken");

  console.log("토큰있지??", token)

  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    console.log("e.타겟:", e.target);

    const { value, name } = e.target;
    setPostInfo({
      ...postInfo,
      [name]: value
    });
  };


  const onCreate = (e) => {
    e.preventDefault();
    console.log("넣는데이터", postInfo);
    axios.post('http://localhost:8050/matchingPost/create', postInfo, {
      headers: {
        'Authorization': "Bearer " + token
      }
    })
    navigate('/');
  }
  const onUpdate = (e) => {
    e.preventDefault();
    const updateInfo = { ...postInfo, id };

    console.log("넣는데이터", updateInfo);
    axios.put('http://localhost:8050/matchingPost/detail/update', updateInfo);

    navigate('/');
  }

  return (
    <div className={styles.container}>
      <section>
        <BsArrowLeft className={styles.backBtn} size="40" onClick={() => navigate(-1)}></BsArrowLeft>
        <div className={styles.header}>
          <h2>기본 정보 입력</h2>
        </div>
        <ul className={styles.ul}>
          <li className={styles.infoItem}>
            <label>운동 구분</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <InputLabel id="categorySelect">종목</InputLabel>
                <Select
                  labelId="categorySelect"
                  id="demo-simple-select"
                  value={postInfo.categoryId}
                  name="categoryId"
                  label="category"
                  onChange={handleChange}
                >
                  {
                    categorys.map((category) => (
                      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    )
                    )
                  }
                </Select>
              </FormControl>
            </Box>
          </li>
          <li className={styles.infoItem}>
            <label>모집 인원</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <InputLabel id="recruitSelect" style={{ zIndex: "-1" }}>인원(본인 포함)</InputLabel>
                <Select
                  labelId="recruitSelect"
                  id="maxNumberOfPeopleSelect"
                  value={postInfo.maxNumberOfPeople}
                  name="maxNumberOfPeople"
                  label="recruitSelect2"
                  onChange={handleChange}
                >

                  <MenuItem value={2}>2명</MenuItem>
                  <MenuItem value={3}>3명</MenuItem>
                  <MenuItem value={4}>4명</MenuItem>
                  <MenuItem value={5}>5명</MenuItem>
                  <MenuItem value={6}>6명</MenuItem>
                  <MenuItem value={7}>7명</MenuItem>
                  <MenuItem value={8}>8명</MenuItem>
                  <MenuItem value={9}>9명</MenuItem>
                  <MenuItem value={10}>10명</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </li>
        </ul>
        <ul className={styles.ul}>
          <li className={styles.infoItem}>
            <label>운동 일자</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <InputLabel id="dateSelect" className={styles.inputCalendar}><FcCalendar style={{ marginLeft: "310px" }} /></InputLabel>
                <DatePicker className={styles.datePicker} selected={postInfo.matchingDate} name="matchingDate"
                  onChange={(date) => setPostInfo({ ...postInfo, matchingDate: date })} />
              </FormControl>
            </Box>
          </li>
          <li className={styles.infoItem}>
            <label>운동 시작시간</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <TimeInput
                  className={styles.inputTime}
                  initialTime={board ? board.matchingTime : "00:00"}
                  value={postInfo.matchingTime}
                  name="matchingTime"
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </li>
        </ul>
        <ul className={styles.ul}>
          <li className={styles.infoItem}>
            <label>운동 장소</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <TextField
                  value={postInfo.place}
                  onChange={handleChange}
                  label="장소를 입력해주세요."
                  name="place"
                  onClick={() => setModalOpen(true)}
                />
              </FormControl>
            </Box>
            <Button onClick={() => setPostInfo({ ...postInfo, place: liveAddr })}>장소 미정이신가요?</Button>
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
                  width: "600px",
                  height: "500px",

                },
              }}
            >
              <BoardPlaceInput postInfo={postInfo} setPostInfo={setPostInfo} setModalOpen={setModalOpen} style={{ zIndex: "999" }} />
              <button onClick={() => setModalOpen(false)}>닫기</button>
            </Modal>
          </li>
          <li className={styles.infoItem}>
            <label>추천 숙련도</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <InputLabel id="recommendSelect" style={{ zIndex: "-1" }}>추천 숙련도</InputLabel>
                <Select
                  labelId="recommendSelect"
                  id="demo-simple-select"
                  value={postInfo.recommendedSkill}
                  label="recommend"
                  name="recommendedSkill"
                  onChange={handleChange}
                >
                  <MenuItem value={"누구나"}>누구나</MenuItem>
                  <MenuItem value={"뉴비"}>뉴비</MenuItem>
                  <MenuItem value={"중급"}>중급</MenuItem>
                  <MenuItem value={"고급"}>고급</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </li>
        </ul>
      </section>
      <section>
        <div className={styles.header}>
          <h2>운동을 소개해주세요</h2>
        </div>
        <ul className={styles.ul}>
          <Box sx={{ width: "100%" }}>
            <TextField
              id="outlined-basic"
              label="제목"
              variant="outlined"
              className={styles.title}
              name="postName"
              value={postInfo.postName}
              onChange={handleChange}
            />
          </Box>
        </ul>
        <ul className={styles.ul}>
          <Box sx={{ width: "100%", height: "500px" }}>
            <TextField
              id="outlined-basic"
              label="내용"
              variant="outlined"
              value={postInfo.postContents}
              name="postContents"
              onChange={handleChange}
              className={styles.contents}
              multiline
              rows={10}
              maxRows={15}
            />
            <div className={styles.btnBox}>
              <Button variant="outlined" onClick={() => navigate(-1)}>취소</Button>
              {api === "update" ?
                <Button variant="outlined" onClick={onUpdate}>수정하기</Button> :
                <Button variant="outlined" onClick={onCreate}>등록하기</Button>
              }
            </div>
          </Box>

        </ul>
      </section>
    </div>
  );
};

export default BoardRegister;