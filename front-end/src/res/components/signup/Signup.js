import { Card, Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../../css/login/signupComponent.css";
import AddressInput from "./AddressInput";
import Modal from "react-modal";
import { axiosPost } from "../axios/Axios";
import { redirectURL } from "../url/CheckURL";
import CheckID from "./CheckID";
import CheckNickname from "./CheckNickname";
import PartyFace from "../../img/partyFace.png";
import {BsArrowLeftSquare} from 'react-icons/bs'

export default function Signup(props) {
  const { loginBtn } = props;
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [sex, setSex] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [signupComponent, setSignupComponent] = useState("");
  const [signupBtnDiv, setSignupBtnDiv] = useState("");
  const [signupGreetingBtn, setSignupGreetingBtn] = useState("");
  const [signupBtn, setSignupBtn] = useState("");
  const [signupDisplay, setSignupDisplay] = useState("");

  function postData(e) {
    e.preventDefault();
    console.log(id);
    const data = {
      userId: id,
      userPw: password,
      address: address,
      birthday: birthDay,
      name: name,
      nickname: nickname,
      phone: phoneNumber,
      sex: sex,
    };

    axiosPost("/signUp", data)
      .then(() => {
        redirectURL("signup");
      })
      .catch(() => {
        alert("정보를 다시 입력해주세요.");
      });
  }

  useEffect(() => {
    setId(id);
    setSignupComponent(document.querySelector(".signup-component"));
    setSignupBtnDiv(document.querySelector(".btn-show-signup"));
    setSignupGreetingBtn(document.querySelector(".signup-component .greeting-btn"));
    setSignupBtn(document.querySelector(".btn-show-signup .btn"));
    setSignupDisplay(document.querySelector(".display-signup"));
  }, [props]);

  const toggleActive = () => {
    signupComponent.classList.toggle("active");
    signupBtnDiv.classList.toggle("active");
    signupDisplay.classList.toggle("active");
  };

  function showSignup() {
    const clientWidth = document.body.clientWidth;

    setTimeout(() => {
      if (clientWidth < 1024) {
        signupDisplay.classList.add("login-enter");
      } else {
        signupBtnDiv.style.left = "50%";
        signupDisplay.style.right = "50%";
        signupBtnDiv.classList.toggle("login-enter-left");
        signupDisplay.classList.toggle("login-enter-right");
        signupBtn.classList.toggle("active");
        signupGreetingBtn.classList.toggle("active");
      }
      loginBtn.style.display = "none";
      toggleActive();
    }, 500);
  }

  function hideSignup() {
    const clientWidth = document.body.clientWidth;

    if (clientWidth < 1024) {
      signupDisplay.classList.toggle("login-leave");
      setTimeout(() => {
        toggleActive();
        loginBtn.style.display = "flex";
      }, 1200);

      setTimeout(() => {
        signupDisplay.classList.toggle("login-leave");
      }, 1250);
    } else {
      signupBtnDiv.style.left = "0%";
      signupDisplay.style.right = "0%";
      signupBtnDiv.classList.toggle("login-enter-right-hide");
      signupDisplay.classList.toggle("login-enter-left-hide");
      setTimeout(() => {
        signupBtnDiv.classList.remove("login-enter-left");
        signupDisplay.classList.remove("login-enter-right");
        toggleActive();
        signupBtnDiv.classList.toggle("login-enter-right-hide");
        signupDisplay.classList.toggle("login-enter-left-hide");
        loginBtn.style.display = "flex";
        signupBtn.classList.toggle("active");
        signupGreetingBtn.classList.toggle("active");
      }, 950);
    }
  }

  return (
    <div className="signup-component">
      <div className="btn-show-signup">
        <div className="greeting-btn ">
          <span>새로운 운동메이트 시군요!!</span>
          <img src={PartyFace} />
        </div>
        <Button onClick={() => showSignup()}>
          <p>회원가입</p>
        </Button>
      </div>
      <div className="display-signup">
        <p className="btn-close" onClick={() => hideSignup()}>
          <BsArrowLeftSquare/>
        </p>
        <div className="greeting">
          <p className="greeting">
            새로운 운동메이트를 만날시간이에요!
            <img src={PartyFace} alt="part-face" />
          </p>
        </div>
        <Form>
          <div className="signup-separate">
            <div className="signup-part1">
              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Label>ID</Form.Label>
                <div className="checkID  input-text-btn">
                  <Form.Control type="text" placeholder="ID" readOnly value={id} />
                  <CheckID setId={setId}></CheckID>
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="input-text"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Label>
                  <p>주소</p>
                </Form.Label>
                <div className="signup-find-address input-text-btn">
                  <Form.Control type="text" placeholder="주소" readOnly value={address} />
                  <Button variant="success" onClick={() => setModalOpen(true)} className="btn-find-address">
                    <p>주소찾기</p>
                  </Button>
                </div>
              </Form.Group>

              <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="modal-address">
                <div className="btn-close">
                  <Button variant="dark" onClick={() => setModalOpen(false)}>
                    <p>닫기</p>
                  </Button>
                </div>
                <AddressInput setAddress={setAddress} setModalOpen={setModalOpen} />
              </Modal>

              <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Label>
                  <p>생일</p>
                </Form.Label>
                <Form.Control
                  className="input-text"
                  type="date"
                  onChange={(e) => {
                    e.preventDefault();
                    setBirthDay(e.target.value);
                  }}
                />
              </Form.Group>
            </div>
            <div className="signup-part2">
              <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Label>
                  <p>이름</p>
                </Form.Label>
                <Form.Control
                  className=" input-text"
                  type="text"
                  placeholder="이름"
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Label>
                  <p>별명</p>
                </Form.Label>
                <div className="signup-checkID input-text-btn">
                  <Form.Control type="text" placeholder="별명" readOnly value={nickname} />
                  <CheckNickname setNickname={setNickname}></CheckNickname>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Label>
                  <p>전화번호</p>
                </Form.Label>
                <Form.Control
                  className=" input-text"
                  type="text"
                  placeholder="전화번호"
                  onChange={(e) => {
                    e.preventDefault();
                    setPhoneNumber(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Label>
                  <p>성별</p>
                </Form.Label>
                <div className="check-gender">
                  <Form.Check
                    type="radio"
                    name="sex"
                    value="남자"
                    label="남자"
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                  />
                  <Form.Check
                    type="radio"
                    name="sex"
                    value="여자"
                    label="여자"
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                  />
                </div>
              </Form.Group>{" "}
            </div>
          </div>
          <div className="btn-signup">
            <Button type="submit" variant="primary" onClick={postData}>
              <p>회원가입</p>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
