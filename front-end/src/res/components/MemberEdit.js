import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { axiosGet, axiosPost } from "./axios/Axios";
import AddressModal from "./Modal/AddressModal";
import CheckNickname from "./signup/CheckNickname";

export default function MemberEdit() {
  const [member, setMember] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState();
  const [nickname, setNickname] = useState();
  const [birthday, setBirthday] = useState();
  const [phoneNum, setPhoneNum] = useState();

  const getMember = () => {
    const header = {
      Authorization: "bearer " + sessionStorage.getItem("jwtToken"),
    };
    const data = axiosGet("/myAccount", header).then((res) => {
      setMember(res.data.data);
      setNickname(res.data.data.nickname);
      setBirthday(res.data.data.birthday);
      setPhoneNum(res.data.data.phone);
      setAddress(res.data.data.address);
    });
  };

  const updateMember = () => {
    const header = {
      Authorization: "bearer " + sessionStorage.getItem("jwtToken"),
    };
    const data = {
      address: address,
      birthday: birthday,
      name: member.name,
      nickname: nickname,
      phone: phoneNum,
      sex: member.sex,
      userPw: password,
    };

    axios({
      method: "put",
<<<<<<< HEAD
      url: `http://localhost:8080/myAccount/update`,
=======
      url: ` https://2adb-60-253-18-218.jp.ngrok.io/myAccount/update`,
>>>>>>> origin/junwoo7
      data: data,
      headers: {
        Authorization: "bearer " + sessionStorage.getItem("jwtToken") || null,
        "Content-Type": "application/JSON",
      },
    });
  };
  useEffect(() => {
    getMember();
  }, []);

  if (member)
    return (
      <>
        <label>아이디 : </label>
        <label>{member.userId}</label>
        <br></br>
        {/* br은 나중에 css로 수정.. */}
        <label>비밀번호 변경 : </label>
        <input
          type="password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <br></br>
        {/* br은 나중에 css로 수정.. */}
        <label>이름 : </label>
        <label>{member.name}</label>
        <br></br>
        {/* br은 나중에 css로 수정.. */}
        <label>별명 : </label>
        <label>{nickname}</label>
        <CheckNickname setNickname={setNickname}></CheckNickname>
        <br></br>
        {/* br은 나중에 css로 수정.. */}
        <label>주소 : </label>
        <input type="text" readOnly value={address} />
        <AddressModal setAddress={setAddress}></AddressModal>
        <br></br>
        {/* br은 나중에 css로 수정.. */}
        <label>생일 : </label>
        <label>{birthday} </label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => {
            e.preventDefault();
            setBirthday(e.target.value);
            console.log(e.target.value);
          }}
        ></input>
        <br></br>
        {/* br은 나중에 css로 수정.. */}
        <label>핸드폰 번호 : </label>
        <input
          type="text"
          placeholder={phoneNum}
          onChange={(e) => {
            e.preventDefault();
            setPhoneNum(e.target.value);
          }}
        />
        <br></br>
        {/* br은 나중에 css로 수정.. */}
        <Button
          onClick={(e) => {
            e.preventDefault();
            updateMember();
          }}
        >
          변경
        </Button>
      </>
    );
}
