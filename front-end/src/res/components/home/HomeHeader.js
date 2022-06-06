import React, { useEffect, useRef } from "react";
import { Button, Carousel, Container } from "react-bootstrap";
import WinkingIcon from "../../img/winkingIcon.png";
import "../../css/home/homeHeader.css";
// import "../../css/home/homeHeader copy.css";
import "../../css/home/homeHeaderAnimation.css";
import "../../css/home/homeHeaderResponsive.css";
import Slide from "../../img/background-image/homePage.png";
import Map from "../../img/Image/map2.gif";
import Chat from "../../img/Image/chat.gif";
import Muscle from "../../img/Image/muscle.gif";
import Badge from "../../img/Image/badge.gif";
import Together from "../../img/Image/together.gif";
import { useNavigate } from 'react-router-dom';

const Header = (props) => {

  const {categorys , liveAddr} = props;

  console.log("홈헤더에서 정보나와야되요.,.",categorys,liveAddr);

  const navigate = useNavigate();

  function setObserver() {
    if (document.querySelector(".fade-class")) {
      console.log("Loaded...");
      const targets = document.querySelectorAll(".fade-class");
      const options = {
        root: null,
        threshold: 0.1,
      };
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          const container = entry.target;
          if (entry.isIntersecting) {
            container.classList.add("fade-in");
          } else container.classList.remove("fade-in");
        });
      }, options);
      targets.forEach((target) => {
        observer.observe(target);
      });
    }
  }

  useEffect(() => {
    setObserver();
  });

  return (
    <div className="header">
      <div className="bg-img"></div>
      <div className="logo">
        <div className="title">
          <p>혼자서만 하는 운동, 지겹지 않으신가요?</p>
          <h1>운동메이트</h1>
          <div className="buttons">
            <Button className="btn btn-category-find" onClick={()=> navigate("/main")}>
              <p>운동메이트 찾기</p>
            </Button>
            <Button className="btn btn-category-create" onClick={() => {
              navigate('/register', {
                state: {
                  categorys: categorys,
                  liveAddr: liveAddr
                }
              });
            }}>
              <p>운동메이트 모집하기</p>
            </Button>
          </div>
        </div>
      </div>
      <div className="introduce">
        <p>운동메이트를 통해</p>
        <div className="fade-class">
          <div className="img-box">
            <img src={Map} alt="" className="img-map" />
          </div>
          <div className="caption">
            <p className="title">실시간 위치 조회</p>
            <p className="text">근처의 다른 운동메이트를 찾아보세요!</p>
          </div>
        </div>

        <div className="fade-class">
          <div className="caption">
            <p className="title">자유로운 소통</p>
            <p className="text chat-text">채팅메이트의 채팅기능을 사용, 운동메이트들과 소통해보세요!</p>
          </div>
          <div className="img-box">
            <img src={Chat} alt="" className="img-muscle" />
          </div>
        </div>

        <div className="fade-class">
          <div className="img-box">
            <img src={Badge} alt="" className="img-muscle" />
          </div>
          <div className="caption">
            <p className="title">뱃지 시스템</p>
            <p className="text chat-text">뱃지획득을 통해 성취감을 느껴보세요!</p>
          </div>
        </div>

        <div className="fade-class">
          <div className="caption">
            <p className="title">체력 및 근력 향상</p>
            <p className="text injury-text">꾸준한 운동으로 건강을 챙겨보세요!</p>
          </div>
          <div className="img-box">
            <img src={Muscle} alt="" className="img-muscle" />
          </div>
        </div>

        <div className="fade-class">
          <div className="img-box">
            <img src={Together} alt="" className="img-muscle" />
          </div>
          <div className="caption">
            <p className="title">함께 할때 더 즐거운</p>
            <p className="text chat-text">함께 운동할때 더 커지는 운동효과, 알고 계셨나요?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
