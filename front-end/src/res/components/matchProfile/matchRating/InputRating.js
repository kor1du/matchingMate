import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';
// import { axiosPost } from '../../axios/Axios';
import styles from '../matchHistory/historyMateItem.module.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const ARRAY = [0, 1, 2, 3, 4];

const InputRating = (props) => {
  const {matchingHistoryId, targetMemberId, setModalOpen, updateCompleted} = props;
  const token = "Bearer " + sessionStorage.getItem("jwtToken");
  
  const [skillPoint, setSkillPoint] = useState([false, false, false, false, false]);
  const [mannerPoint, setMannerPoint] = useState([false, false, false, false, false]);
  const [content, setContent] = useState("");

  const handleSkillPoint = index => {
    let skillPointStates = [...skillPoint];
    for (let i = 0; i < 5; i++) {
      skillPointStates[i] = i <= index ? true : false;
    }
    setSkillPoint(skillPointStates);
  };

  const handleMannerPoint = index => {
    let mannerPointStates = [...mannerPoint];
    for (let i = 0; i < 5; i++) {
      mannerPointStates[i] = i <= index ? true : false;
    }
    setMannerPoint(mannerPointStates);
  };

  const textChange = (e) => {
    setContent(e.target.value);
  }

  const sendReview = () => {
    let skillPointValue = skillPoint.filter(Boolean).length;
    let mannerPointValue = mannerPoint.filter(Boolean).length;


    const res = axios.post('http://localhost:8080/profile/history/detail/rating', {
        matchingHistoryId: matchingHistoryId,
        targetMemberId: targetMemberId,
        skillPoint : skillPointValue,
        mannerPoint: mannerPointValue,
        contents : content
      },
     
      {
        headers:{
          Authorization: token,
        }
      }
    );
    setModalOpen(false)
    console.log(res);
  };

  

  return (
    <div>
    <Wrap>
      <RatingText>평가하기</RatingText>
      기술점수
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="50"
              onClick={() => handleSkillPoint(el)}
              className={skillPoint[el] && 'yellowStar'}
            />
          );
        })}
      </Stars>

      매너점수
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="50"
              onClick={() => handleMannerPoint(el)}
              className={mannerPoint[el] && 'yellowStar'}
            />
          );
        })}
      </Stars>
      <InputText style={{ width:"100%" }} placeholder='내용을 입력하세요.' onChange={textChange}></InputText>

      
    </Wrap>
      <div className={styles.btnBox}>
        <Button onClick={() => { sendReview(); updateCompleted(); }}>완료</Button>
        <Button onClick={() => setModalOpen(false)} style={{margin:"0 3px 0 0"}}>닫기</Button>  
      </div>
    </div>
    
  );
};

export default InputRating;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

const InputText = styled.textarea`
  width: 50%;
  resize: none;
  height: 200px


`;