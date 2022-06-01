import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import View from "../../img/view.png";

const BoardItem = (props) => {

  const { board, categorys } = props;
  const navigate = useNavigate();

  return (
    <>
      <Col xl="3" lg="6" md="6" sm="6" className='board-item' onClick={() => {
        navigate(`/post/${board.id}`, {
          state: {
            categorys
          }
        });
      }}>
        {/* <Link to={`/post/${board.id}`}></Link> */}
        <Card border="primary">
          <Card.Header>
            <p>{board.postName}</p>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <p>{board.matchingDate}</p>
              <p>종목 : {board.categoryName}</p>
              <p>시간 : {board.matchingTime}</p>
              <p>장소 : {board.place}</p>
              <p>모집인원 : {board.maxNumberOfPeople}</p>
              <p>추천실력 : {board.recommendedSkill}</p>
              <div className="info">
                <img src={View} alt="View" />
                <span>{board.views}</span>
              </div>
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>

    </>
  );
};

export default BoardItem;