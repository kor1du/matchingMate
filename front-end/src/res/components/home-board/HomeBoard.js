<<<<<<< HEAD
import React from "react";
import View from "../../img/view.png";
import Sparkles from "../../img/sparkles.png";
import Fire from "../../img/fire.png";
import { Row, Col, Card } from "react-bootstrap";
import HomeBoardDetail from "./HomeBoardDetail";
import HomeBoardCreate from "./HomeBoardCreate";
import "../../css/home-board/homeBoard.css";

function Board() {
  const testDate = "22/03/28";

  return (
    <>
      <div className="board">
        <Row className="new-hot">
          <Col xs="12">
            <a href="#" className="new">
              <p>최신</p>
              <img src={Sparkles} alt="sparkles" />
            </a>
            <a href="#" className="hot">
              <p>인기</p>
              <img src={Fire} alt="sparkles" />
            </a>
          </Col>
          <Col>
            <HomeBoardCreate></HomeBoardCreate>
          </Col>
        </Row>
        <Row>
          <Col xl="3" lg="6" md="6" sm="6">
            <Card border="primary">
              <Card.Header>
                <p>야구 한판 뛰실분?</p>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <p>{testDate}</p>
                  <p>시간 : 18:00</p>
                  <p>장소 : 구미시 거의동</p>
                  <p>모집인원 : 2/10</p>
                  <p>추천실력 : 중</p>
                  <div className="info">
                    <img src={View} alt="View" />
                    <span>10</span>
                  </div>
                </Card.Title>
              </Card.Body>
              <HomeBoardDetail title={testDate}></HomeBoardDetail>
            </Card>
          </Col>
          <Col xl="3" lg="6" md="6" sm="6">
            <Card border="primary">
              <Card.Header>
                <p>야구 한판 뛰실분?</p>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <p>날짜 : 22/03/25</p>
                  <p>시간 : 18:00</p>
                  <p>장소 : 구미시 거의동</p>
                  <p>모집인원 : 2/10</p>
                  <p>추천실력 : 중</p>
                  <div className="info">
                    <img src={View} alt="View" />
                    <span>10</span>
                  </div>
                </Card.Title>
              </Card.Body>
              <HomeBoardDetail title="22/03/25"></HomeBoardDetail>
            </Card>
          </Col>
          <Col xl="3" lg="6" md="6" sm="6">
            <Card border="primary">
              <Card.Header>
                <p>야구 한판 뛰실분?</p>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <p>날짜 : 22/03/25</p>
                  <p>시간 : 18:00</p>
                  <p>장소 : 구미시 거의동</p>
                  <p>모집인원 : 2/10</p>
                  <p>추천실력 : 중</p>
                  <div className="info">
                    <img src={View} alt="View" />
                    <span>10</span>
                  </div>
                </Card.Title>
              </Card.Body>
              <HomeBoardDetail title="22/03/25"></HomeBoardDetail>
            </Card>
          </Col>
          <Col xl="3" lg="6" md="6" sm="6">
            <Card border="primary">
              <Card.Header>
                <p>야구 한판 뛰실분?</p>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <p>날짜 : 22/03/25</p>
                  <p>시간 : 18:00</p>
                  <p>장소 : 구미시 거의동</p>
                  <p>모집인원 : 2/10</p>
                  <p>추천실력 : 중</p>
                  <div className="info">
                    <img src={View} alt="View" />
                    <span>10</span>
                  </div>
                </Card.Title>
              </Card.Body>
              <HomeBoardDetail title="22/03/25"></HomeBoardDetail>
            </Card>
          </Col>
          <Col xl="3" lg="6" md="6" sm="6">
            <Card border="primary">
              <Card.Header>
                <p>야구 한판 뛰실분?</p>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <p>날짜 : 22/03/25</p>
                  <p>시간 : 18:00</p>
                  <p>장소 : 구미시 거의동</p>
                  <p>모집인원 : 2/10</p>
                  <p>추천실력 : 중</p>
                  <div className="info">
                    <img src={View} alt="View" />
                    <span>10</span>
                  </div>
                </Card.Title>
              </Card.Body>
              <HomeBoardDetail title="22/03/25"></HomeBoardDetail>
            </Card>
          </Col>
          <Col xl="3" lg="6" md="6" sm="6">
            <Card border="primary">
              <Card.Header>
                <p>야구 한판 뛰실분?</p>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <p>날짜 : 22/03/25</p>
                  <p>시간 : 18:00</p>
                  <p>장소 : 구미시 거의동</p>
                  <p>모집인원 : 2/10</p>
                  <p>추천실력 : 중</p>
                  <div className="info">
                    <img src={View} alt="View" />
                    <span>10</span>
                  </div>
                </Card.Title>
              </Card.Body>
              <HomeBoardDetail title="22/03/25"></HomeBoardDetail>
            </Card>
          </Col>
          <Col xl="3" lg="6" md="6" sm="6">
            <Card border="primary">
              <Card.Header>
                <p>야구 한판 뛰실분?</p>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <p>날짜 : 22/03/25</p>
                  <p>시간 : 18:00</p>
                  <p>장소 : 구미시 거의동</p>
                  <p>모집인원 : 2/10</p>
                  <p>추천실력 : 중</p>
                  <div className="info">
                    <img src={View} alt="View" />
                    <span>10</span>
                  </div>
                </Card.Title>
              </Card.Body>
              <HomeBoardDetail title="22/03/25"></HomeBoardDetail>
            </Card>
          </Col>
          <Col xl="3" lg="6" md="6" sm="6">
            <Card border="primary">
              <Card.Header>
                <p>야구 한판 뛰실분?</p>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <p>날짜 : 22/03/25</p>
                  <p>시간 : 18:00</p>
                  <p>장소 : 구미시 거의동</p>
                  <p>모집인원 : 2/10</p>
                  <p>추천실력 : 중</p>
                  <div className="info">
                    <img src={View} alt="View" />
                    <span>10</span>
                  </div>
                </Card.Title>
              </Card.Body>
              <HomeBoardDetail title="22/03/25"></HomeBoardDetail>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

=======
import React, { useState } from "react";
import Sparkles from "../../img/sparkles.png";
import Fire from "../../img/fire.png";
import { Row, Col, Button } from "react-bootstrap";

import "../../css/home-board/homeBoard.css";
import BoardItem from "./BoardItem";
import BoardPagination from "./BoardPagination";
import styled from "styled-components";

import { useNavigate } from "react-router";

function Board(props) {
  const { boards, getPopularBoards, getBoards, getLocation, lat, lng, liveAddr, categorys, boardDelete } = props;

  const limit = 8;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const navigate = useNavigate();
  console.log("보드진입 : 현위치는요? :", liveAddr);
  console.log("보드데이터: ",boards );


  return (
    <Layout>
      <div className="board">
        <Row className="new-hot">
          <Col xs="12">
            <div className="new" onClick={() => getBoards(lat, lng)}>
              <p>최신</p>
              <img src={Sparkles} alt="sparkles" />
            </div>
            <div className="hot" onClick={() => getPopularBoards(lat, lng)}>
              <p>인기</p>
              <img src={Fire} alt="sparkles" />
            </div>
            <Button onClick={() => getLocation()}>위치 갱신</Button>
            <span>
              <h3>{liveAddr}</h3>
            </span>
            <Button
              onClick={() => {
                navigate("/register", {
                  state: {
                    categorys: categorys,
                    liveAddr: liveAddr,
                  },
                });
              }}
            >
              공고 등록
            </Button>
          </Col>
        </Row>
        <Row className="board-list">
          {/* {boards.map((board) => <BoardItem key={board.id} board={board} />)} */}

          {boards.slice(offset, offset + limit).map((board) => <BoardItem key={board.id} board={board} categorys={categorys} />)}

        </Row>
      </div>
      <footer>
        <BoardPagination total={boards.length} limit={limit} page={page} setPage={setPage} />
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
>>>>>>> origin/jungYH
export default Board;
