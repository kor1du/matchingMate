<<<<<<< HEAD
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

function CarouselBody() {
  return (
    <Carousel interval={3000} indicators={null} pause={"hover"}>
      <Carousel.Item>
        <h1>어떤 운동 메이트를 찾고 계신가요?</h1>
        <Row className="carousel-row">
          <Col lg="3" md="6" sm="6" xs="2" className="carousel-col">
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
=======
import React, { useState } from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import "../../css/home/homeCarousel.css";

function CarouselBody(props) {
  function ShowCategory({ category }) {
    return (
      <Col lg="3" md="6" sm="6" xs="2" className="carousel-col" onClick={(e) => categoryFilter(e, category.name)}>
        <a href="">
          <img src={category.imgAddress} alt="" />
        </a>
        <p>{category.name}</p>
      </Col>
    );
  }

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(4);

  const nextBtn = document.querySelector(".carousel-control-next-icon");
  const prevBtn = document.querySelector(".carousel-control-prev-icon");
  const { categoryFilter } = props;
  const { categorys } = props;

  const initializeOffsetAndLimit = () => {
    if (offset > 0) {
      setOffset((offset) => {
        offset = 0;
        return offset;
      });
      setLimit((limit) => {
        limit = 4;
        return limit;
      });
    } else {
      setOffset((offset) => {
        offset = categorys.length - 4;
        return offset;
      });
      setLimit((limit) => {
        limit = categorys.length;
        return limit;
      });
    }
  };

  const increaseOffsetAndLimit = (offset, limit) => {
    if (offset >= categorys.length - 4) {
      initializeOffsetAndLimit();
      return;
    } else {
      setOffset(() => {
        offset += 4;
        return offset;
      });
      setLimit(() => {
        limit += 4;
        return limit;
      });
    }
  };

  const decreaseOffsetAndLimit = (offset, limit) => {
    console.log(offset, limit);
    if (offset <= 0) {
      initializeOffsetAndLimit();
      return;
    } else {
      const amount = offset % 4;
      setOffset(() => {
        if (amount === 0) offset -= 4;
        else offset -= amount;
        return offset;
      });
      setLimit(() => {
        if (amount === 0) limit -= 4;
        else limit -= amount;
        return limit;
      });
    }
  };

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        increaseOffsetAndLimit(offset, limit);
      },
      {
        once: true,
      }
    );

    prevBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        decreaseOffsetAndLimit(offset, limit);
      },
      {
        once: true,
      }
    );
  }

  if (categorys) {
    return (
      <>
        <Carousel indicators={null} pause={"hover"}>
          <Carousel.Item>
            <Row className="carousel-row">
              <h1>어떤 운동 메이트를 찾고 계신가요?</h1>
              {categorys.slice(offset, limit).map((category) => {
                return <ShowCategory key={category.id} category={category}></ShowCategory>;
              })}
            </Row>
          </Carousel.Item>
        </Carousel>
      </>
    );
  }
>>>>>>> origin/jungYH
}

export default CarouselBody;
