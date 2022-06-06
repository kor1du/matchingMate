import axios from "axios";
import React from "react";
import { useEffect } from "react";
// import { useEffect } from 'react';
import { useState } from "react";
import styles from "./matchMain.module.css";
import LineChart from "./LineChart";
import DonutChart from "./DonutChart";

const mainProfileContent = (props) => {
  const token = "Bearer " + sessionStorage.getItem("jwtToken");
  const headers = {
    Authorization: token,
  };

  const { profileInfo } = props;

  const [profileContent, setProfileContent] = useState("");

  const [inputText, setInputText] = useState();
  const [checked, setChecked] = useState(false);

  const matchingCountLabelList = props.matchingCountLabelList;
  const matchingCountDataList = props.matchingCountDataList;
  const categoryLabelList = props.categoryLabelList;
  const categoryDataList = props.categoryDataList;

  useEffect(() => {
    setProfileContent(props.profileContent);
  }, [props]);

  const clickUpdateImg = () => {
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
        "http://localhost:8080/profile/updateProfileContent",
        { profileContent: inputText },
        { headers: headers }
      )
    ).data;

    console.log(res.data);
  };

  const updateInput = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <div className={styles.profile_info}>
        <div className={styles.profileContenxtHeader}>
          <h4>한줄소개</h4>
          <img
            className={styles.updateImg}
            onClick={clickUpdateImg}
            src="data:image/png;base64,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"
          />
        </div>
        {checked ? (
          <div>
            <input type="text" defaultValue={profileContent} onChange={(e) => updateInput(e)} />
            <button onClick={updateInputText}>완료</button>
          </div>
        ) : (
          <p>{profileContent}</p>
        )}
      </div>

      <div className={styles.profileRating}>
        <h4>평점</h4>
        <p>매너 점수 : {profileInfo.avgMannerPoint}</p>
        <p>실력 점수 : {profileInfo.avgSkillPoint}</p>
      </div>

      <div style={{ paddingBottom: 100 }}>
        <LineChart matchingCountLabelList={matchingCountLabelList} matchingCountDataList={matchingCountDataList} />
      </div>

      <div>
        <DonutChart categoryLabelList={categoryLabelList} categoryDataList={categoryDataList} />
      </div>
    </div>
  );
};

export default mainProfileContent;
