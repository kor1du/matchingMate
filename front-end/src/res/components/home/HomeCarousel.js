import React from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import "../../css/home/homeCarousel.css";
import Soccer from "../../img/soccer.png";
import Basketball from "../../img/basketball.png";
import Baseball from "../../img/baseball.png";
import Pingpong from "../../img/pingpong.png";
import Biking from "../../img/biking.png";
import Chess from "../../img/chess.png";
import Gym from "../../img/gym.png";
import Bowling from "../../img/bowling.png";

function CarouselBody(props) {
  const { categoryFilter } = props;
  return (
    <Carousel interval={3000} indicators={null} pause={"hover"}>
      <Carousel.Item>
        <h1>어떤 운동 메이트를 찾고 계신가요?</h1>
        <Row className="carousel-row">
          <Col lg="3" md="6" sm="6" xs="2" className="carousel-col" onClick={(e) => categoryFilter(e, "축구")}>
            <a href="">
              <img src={Soccer} alt="" />
            </a>
            <p>축구</p>
          </Col>
          <Col lg="3" md="6" sm="6" xs="2" className="carousel-col">
            <a href="">
              <img src={Basketball} alt="" />
            </a>
            <p>농구</p>
          </Col>
          <Col lg="3" md="6" sm="6" xs="2" className="carousel-col">
            <a href="">
              <img src={Baseball} alt="" />
            </a>
            <p>야구</p>
          </Col>
          <Col lg="3" md="6" sm="6" xs="2" className="carousel-col">
            <a href="">
              <img src={Pingpong} alt="" />
            </a>
            <p>탁구</p>
          </Col>
        </Row>
      </Carousel.Item>
      <Carousel.Item>
        <h1>어떤 운동 메이트를 찾고 계신가요?</h1>
        <Row className="carousel-row">
          <Col lg="3" md="6" sm="6" xs="2" className="carousel-col">
            <a href="">
              <img src={Biking} alt="" />
            </a>
            <p>라이딩</p>
          </Col>
          <Col lg="3" md="6" sm="6" xs="2" className="carousel-col">
            <a href="">
              <img src={Chess} alt="" />
            </a>
            <p>체스</p>
          </Col>
          <Col lg="3" md="6" sm="6" xs="2" className="carousel-col">
            <a href="">
              <img src={Gym} alt="" />
            </a>
            <p>헬스</p>
          </Col>
          <Col lg="3" md="6" sm="6" xs="2" className="carousel-col">
            <a href="">
              <img src={Bowling} alt="" />
            </a>
            <p>볼링</p>
          </Col>
        </Row>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselBody;
