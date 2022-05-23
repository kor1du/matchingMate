import React, { useState } from "react";
import Sparkles from "../../img/sparkles.png";
import Fire from "../../img/fire.png";
import { Row, Col, Button } from "react-bootstrap";

import HomeBoardCreate from "./HomeBoardCreate";
import "../../css/home-board/homeBoard.css";
import BoardItem from './BoardItem';
import BoardPagination from './BoardPagination';
import styled from "styled-components";




function Board(props) {

  const { boards, getPopularBoards, getBoards, getLocation, lat, lng, liveAddr } = props;


  const limit = 8;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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
          </Col>
          <Col>
            <HomeBoardCreate></HomeBoardCreate>
          </Col>
        </Row>
        <Row className="board-list">
          {/* {boards.map((board) => <BoardItem key={board.id} board={board} />)} */}
          {boards.slice(offset, offset + limit).map((board) => <BoardItem key={board.id} board={board} />)}
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
