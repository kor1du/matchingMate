import React from "react";
import { Button } from "react-bootstrap";
import "../../css/chatting/chattingLeftside.css";
import Person1 from "../../img/person1.png";
import Person2 from "../../img/person2.png";
import Person3 from "../../img/person3.png";
import Person4 from "../../img/person4.png";
import Person5 from "../../img/person5.png";
import { toggle } from "../toggle/Toggle";

function handleReadyBtn(event) {
  const userArr = document.querySelectorAll(".detail h3");
  const targetUserName = event.target.previousSibling.innerHTML;
  var targetUser = event.target;
  for (var i = 0; i < userArr.length; i++) {
    if (userArr[i].innerHTML === targetUserName) {
      targetUser = userArr[i].nextSibling;
    }
  }

  if (targetUser.classList.contains("active")) targetUser.innerHTML = "준비중";
  else targetUser.innerHTML = "준비 완료!";
  toggle(targetUser);
}

export default function Chatting() {
  return (
    <ul>
      <li>
        <div className="profile-img">
          <img src={Person1} alt="person1" />
        </div>
        <div className="detail">
          <h3>유저1</h3>
          <Button
            variant="secondary"
            onClick={handleReadyBtn}
            className="ready-btn"
          >
            준비중
          </Button>
          <span className="me">나</span>
        </div>
      </li>
      <li>
        <div className="profile-img">
          <img src={Person2} alt="person2" />
        </div>
        <div className="detail">
          <h3>유저2</h3>
          <Button
            variant="secondary"
            onClick={handleReadyBtn}
            className="ready-btn"
          >
            준비중
          </Button>
        </div>
      </li>
      <li>
        <div className="profile-img">
          <img src={Person3} alt="person3" />
        </div>
        <div className="detail">
          <h3>유저3</h3>
          <Button
            variant="secondary"
            onClick={handleReadyBtn}
            className="ready-btn"
          >
            준비중
          </Button>
        </div>
      </li>
      <li>
        <div className="profile-img">
          <img src={Person4} alt="person4" />
        </div>
        <div className="detail">
          <h3>유저4</h3>
          <Button
            variant="secondary"
            onClick={handleReadyBtn}
            className="ready-btn"
          >
            준비중
          </Button>
        </div>
      </li>
      <li>
        <div className="profile-img">
          <img src={Person5} alt="person5" />
        </div>
        <div className="detail">
          <h3>유저5</h3>
          <Button
            variant="secondary"
            onClick={handleReadyBtn}
            className="ready-btn"
          >
            준비중
          </Button>
        </div>
      </li>
    </ul>
  );
}
