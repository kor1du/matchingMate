import React, { useState } from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import "../../css/home/homeCarousel.css";


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
}

export default CarouselBody;
