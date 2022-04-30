import React from "react";
import { Button, Form } from "react-bootstrap";
import "../../css/chatting/chattingRightside.css";
import "../../css/chatting/chatting.css";
import Person1 from "../../img/person1.png";
import Person2 from "../../img/person2.png";
import Person3 from "../../img/person3.png";
import Person5 from "../../img/person5.png";

export default function Chatting() {
  return (
    <div>
      <ul>
        <li>
          <div className="profile-img">
            <img src={Person1} alt="person1" />
          </div>
          <div className="text">
            <h3>안녕하세요!</h3>
          </div>
        </li>
        <li>
          <div className="profile-img">
            <img src={Person2} alt="person1" />
          </div>
          <div className="text">
            <h3>반가워요</h3>
          </div>
        </li>
        <li>
          <div className="profile-img">
            <img src={Person3} alt="person1" />
          </div>
          <div className="text">
            <h3>오늘 오후 7시 구미체육관 맞나요?</h3>
          </div>
        </li>
        <li>
          <div className="profile-img">
            <img src={Person2} alt="person1" />
          </div>
          <div className="text">
            <h3>네 맞습니다!</h3>
          </div>
        </li>
        <li>
          <div className="profile-img">
            <img src={Person5} alt="person1" />
          </div>
          <div className="text">
            <h3>얼른 달리고 싶네요!</h3>
          </div>
        </li>
        <li className="text-me">
          <div className="text">
            <h3>저도 그렇습니다!</h3>
          </div>
        </li>
        <li>
          <div className="profile-img">
            <img src={Person1} alt="person1" />
          </div>
          <div className="text">
            <h3>우리 오늘 열심히 뛰어봐요!</h3>
          </div>
        </li>
      </ul>
      <div className="keyboard">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="채팅을 입력하세요" />
          </Form.Group>
          <Button variant="primary" type="submit">
            <p>전송</p>
          </Button>
        </Form>
      </div>
    </div>
  );
}
