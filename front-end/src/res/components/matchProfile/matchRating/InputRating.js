import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const ARRAY = [0, 1, 2, 3, 4];

const InputRating = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [content, setContent] = useState("");
  const handleStarClick = index => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const sendReview = () => {
    console.log(content);
    //let score = clicked.filter(Boolean).length;
    // axios.post('http://local:8000/rating', {
    // userId : 
    // star : score,
    // content : content
    //  },
    //   
    //   headers: {
    //     Authroization: 'token',
    //   }
    // });
  };

  const textChange = (e) => {
    e.peventdefault();
    setContent(e.target.value);
  }

  useEffect(() => {
    sendReview();
  }, [clicked]);

  return (
    <Wrap>
      <RatingText>평가하기</RatingText>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="50"
              onClick={() => handleStarClick(el)}
              className={clicked[el] && 'yellowStar'}
            />
          );
        })}
      </Stars>
      <InputText placeholder='내용을 입력하세요.' onChange={textChange}>
      </InputText>
    </Wrap>
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