import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function editIntroduce(props) {
  const token = "Bearer " + sessionStorage.getItem("jwtToken");
  const headers = {
    Authorization: token,
  };

  const { setProfileContent } = props;
  const [inputText, setInputText] = useState();
  const [checked, setChecked] = useState(false);

  const clickUpdateImg = () => {
    document.querySelector(".user-profile .introduce>p").style.display = "none";
<<<<<<< HEAD
    document.querySelector(".user-profile .introduce .btn-dark").style.display =
      "none";
=======
    document.querySelector(".user-profile .introduce .btn-dark").style.display = "none";
>>>>>>> origin/junwoo7
    setChecked(!checked);
  };

  const updateInputText = () => {
    setChecked(!checked);

    updateProfileContent();
  };

  const updateProfileContent = async () => {
    setProfileContent(inputText);

    const res = await (
      await axios.post(
<<<<<<< HEAD
        "http://localhost:8080/profile/updateProfileContent",
=======
        " https://2adb-60-253-18-218.jp.ngrok.io/profile/updateProfileContent",
>>>>>>> origin/junwoo7
        { profileContent: inputText },
        { headers: headers }
      )
    ).data;

<<<<<<< HEAD
    document.querySelector(".user-profile .introduce>p").style.display =
      "block";
    document.querySelector(".user-profile .introduce .btn-dark").style.display =
      "block";
=======
    document.querySelector(".user-profile .introduce>p").style.display = "block";
    document.querySelector(".user-profile .introduce .btn-dark").style.display = "block";
>>>>>>> origin/junwoo7
  };

  const updateInput = (e) => {
    setInputText(e.target.value);
  };

  return (
    <>
      <Button onClick={clickUpdateImg} variant="dark">
        <p>수정</p>
      </Button>
      {checked ? (
        <div className="input-edit-introduce">
          <input type="text" onChange={(e) => updateInput(e)} />
          <Button onClick={updateInputText}>
            <p>완료</p>
          </Button>
        </div>
      ) : null}
    </>
  );
}
