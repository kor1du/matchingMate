import React, { useEffect, useState } from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import "../../css/home/homeCarousel.css";
import { axiosGet } from "../axios/Axios";

function CarouselBody(props) {
  function ShowCategory({ category }) {
    return (
      <Col
        lg="3"
        md="6"
        sm="6"
        xs="2"
        className="carousel-col"
        onClick={(e) => categoryFilter(e, category.name)}
      >
        <a href="">
          <img src={category.imgAddress} alt="" />
        </a>
        <p>{category.name}</p>
      </Col>
    );
  }

  const [interval, setInterval] = useState(3000);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(4);
  const [nextBtn, setNextBtn] = useState();
  const [prevBtn, setPrevBtn] = useState();

  const { categoryFilter } = props;
  const { categorys } = props;
  useEffect(() => {}, []);
  if (categorys) {
    return (
      <>
        <Carousel interval={interval} indicators={null} pause={"hover"}>
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
}

export default CarouselBody;
