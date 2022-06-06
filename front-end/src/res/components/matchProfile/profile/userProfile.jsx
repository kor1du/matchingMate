//import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import EditIntroduce from "./EditIntroduce";
import "./userProfile.css";

const UserProfile = (props) => {
  const { profileInfo } = props;
  const token = "Bearer " + sessionStorage.getItem("jwtToken");
  const [file, setFile] = useState("");
  const [isSave, setIsSave] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [profileContent, setProfileContent] = useState(null);

  useEffect(() => {
    setProfileContent(props.profileInfo.profileContent);
  }, [props]);

  let { profileImgAddress } = props.profileInfo;

  const onLoadFile = (e) => {
    const file = e.target.files;

    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;

      if (previewImgUrl) {
        setPreviewImg(previewImgUrl);
        console.log(previewImg);
      }
    };

    setFile(file);
    setIsSave(true);
  };

  const handleDelete = () => {
    setFile(null);
    setPreviewImg(null);
    setIsSave(false);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("file", file[0]);

    console.log(file[0]);

    const headers = {
      "content-type": "multipart/form-data",
      Authorization: token,
    };

    axios
      .post("http://localhost:8080/profile/updateProfileImg", formData, {
        headers,
      })
      .then((res) => {
        console.log(res);
      });

    setIsSave(false);
  };

  if (profileInfo)
    return (
      <div className="user-profile">
        <div className="profile-img">
          <img src={previewImg ? previewImg : profileImgAddress} alt="noImg" />
          <form className="form-profile">
            <input type="file" id="image" accept="image/*" onChange={onLoadFile} style={{ display: "none" }} />
            {file && <p>{file[0].name}</p>}
            <label htmlFor="image" className="label-img">
              <span>이미지 변경</span>
            </label>
            <div className="checkSave">
              {isSave === true ? (
                <>
                  <Button onClick={handleSave} style={{ margin: "0 3px 0 0" }}>
                    <p>저장</p>
                  </Button>
                  <Button onClick={handleDelete}>
                    <p>취소</p>
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>

        <div className="profile-info">
          <p>닉네임 : {profileInfo.memberNickname}</p>
          <div className="introduce">
            <p>한줄소개 : {profileContent}</p>
            <EditIntroduce setProfileContent={setProfileContent}></EditIntroduce>
          </div>
          <p>매너점수 : {profileInfo.avgMannerPoint}</p>
          <p>기술점수 : {profileInfo.avgSkillPoint}</p>
          <p>
            뱃지 :
            <img src={profileInfo.badgeImgAddress.imgAddress} alt="" className="img-badge" />
          </p>
          <p>매칭횟수 : {profileInfo.matchingCount}</p>
        </div>
      </div>
    );
};

export default UserProfile;
