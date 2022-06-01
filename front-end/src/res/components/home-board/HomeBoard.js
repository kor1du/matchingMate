import React, { useState } from "react";
import Sparkles from "../../img/sparkles.png";
import Fire from "../../img/fire.png";
import { Row, Col, Button } from "react-bootstrap";


import "../../css/home-board/homeBoard.css";
import BoardItem from './BoardItem';
import BoardPagination from './BoardPagination';
import styled from "styled-components";
import { useNavigate } from 'react-router';



function Board(props) {

  const { boards, getPopularBoards, getBoards, getLocation, lat, lng, liveAddr, categorys, boardDelete } = props;


  const limit = 8;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const navigate = useNavigate();
  console.log("보드진입 : 현위치는요? :", liveAddr);

  return (
    <Layout>
      <div className="board">
        <Row className="new-hot">
          <Col xs="12">
            <div className='new' onClick={() => getBoards(lat, lng)}>
              <p>최신</p>
              <img src={Sparkles} alt="sparkles" />
            </div>
            <div className='hot' onClick={() => getPopularBoards(lat, lng)}>
              <p >인기</p>
              <img src={Fire} alt="sparkles" />
            </div>
            <Button onClick={() => getLocation()}>위치 갱신</Button>
            <span><h3>{liveAddr}</h3></span>
            <Button onClick={() => {
              navigate('/register', {
                state: {
                  categorys: categorys,
                  liveAddr: liveAddr
                }
              });
            }}>공고 등록</Button>
          </Col>
        </Row>
        <Row className="board-list">
          {/* {boards.map((board) => <BoardItem key={board.id} board={board} />)} */}
          {boards.slice(offset, offset + limit).map((board) => <BoardItem key={board.id} board={board} categorys={categorys} boardDelete={boardDelete} />)}
        </Row>
      </div>
      <footer>
        <BoardPagination
          total={boards.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1420px;
  margin: 0 auto;
`;
export default Board;
