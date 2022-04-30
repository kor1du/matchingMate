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

export default Board;
