//import axios from 'axios';
import React, { useState } from 'react';
import styles from './userProfile.module.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
const UserProfile = (props) => {
  const { profileInfo } = props;
  const token = "Bearer " + sessionStorage.getItem("jwtToken");
  const [file, setFile] = useState('');
  const [isSave,setIsSave] = useState(false);
  const [previewImg,setPreviewImg] = useState(null);
  
  let {profileImgAddress}=props.profileInfo;

  const onLoadFile = (e) => {
    const file = e.target.files;

    let reader = new FileReader();
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;

      // if(previewImgUrl) {
      //   setPreviewImg(previewImgUrl);
      // }

      if(previewImgUrl) {
        setPreviewImg(previewImgUrl);
        console.log(previewImg);
      }
    }

    console.log("선택된 이미지 파일 ", file);
    setFile(file);
    setIsSave(true);
  }

  // const updateImg = (imageFile) => {
  //   const res = 
  // }

  const handleDelete = () => {
    setFile(null);
    setPreviewImg(null);
    setIsSave(false);
  }

  const handleSave = () => {
    const formData = new FormData();
    formData.append('file',file[0]);

    console.log(file[0]);

   const headers = {
        'content-type' : 'multipart/form-data',
        'Authorization': token
    };

    axios.post("http://localhost:8050/profile/updateProfileImg", formData, { headers }).then((res) => {
      console.log(res);
    });
    
    setIsSave(false);
  };


  return (
    <div className={styles.profile}>
            <div className={styles.box}>
              <div className={styles.imgBox}>
              {/* {
                profileInfo.profileImgAddress === "" ? 
                <img src={previewImg ? previewImg : noImgUrl} alt='noImg' className={styles.img} /> 
                : <img src={profileInfo.profileImgAddress} className={styles.img}/>
              } */}

              <img src={previewImg ? previewImg : profileImgAddress} alt='noImg' className={styles.img} /> 

              {/* <img src={profileImgAddress} alt="" /> */}
                
              </div>
              <form className={styles.form}>
                <input type='file' id='image' accept='image/*' onChange={onLoadFile} style={{display:"none"}} />
                {
                  file && 
                    <span>{file[0].name}</span>
                }
                <label htmlFor='image' className={styles.fileBtn}>이미지 변경</label>
                {
                  isSave === true ? 
                    <>
                      <Button onClick={handleSave} style={{margin:"0 3px 0 0"}}>저장</Button>
                      <Button onClick={handleDelete}>취소</Button>
                    </> : <></>
                }
              </form>
              
              {/* <input type='file'>이미지 변경</input> */}
            
              <div>
                <span>닉네임 :  {profileInfo.memberNickname}</span>
              </div>
              
            </div>
            
    </div>
  );
};

export default UserProfile;