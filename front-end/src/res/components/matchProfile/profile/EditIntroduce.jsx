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
    document.querySelector(".user-profile .introduce .btn-dark").style.display = "none";

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
        "https://c0f9-1-235-210-229.jp.ngrok.io/profile/updateProfileContent",
        { profileContent: inputText },
        { headers: headers }
      )
    ).data;

    document.querySelector(".user-profile .introduce>p").style.display = "block";
    document.querySelector(".user-profile .introduce .btn-dark").style.display = "block";
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
