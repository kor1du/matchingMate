//import axios from 'axios';
import React, { useState } from 'react';
import styles from './userProfile.module.css';
import { Button } from 'react-bootstrap';
const UserProfile = (props) => {
  const {member} = props;

  const [file, setFile] = useState('');
  const [isSave,setIsSave] = useState(false);
  const [previewImg,setPreviewImg] = useState(null);

  const noImgUrl = 'data:image/jpeg;base64,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';

  const onLoadFile = (e) => {
    const file = e.target.files;

    let reader = new FileReader();
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;

      if(previewImgUrl) {
        setPreviewImg(previewImgUrl);
      }
    }

    console.log(file);
    setFile(file);
    setIsSave(true);
  }

  const handleDelete = () => {
    setFile(null);
    setPreviewImg(null);
    setIsSave(false);
  }

  const handleSave = () => {
    const formdata = new FormData();
    formdata.append('uploadImage',file[0]);

   /* const config = {
      Headers : {
        'content-type' : 'multipart/form-data',
      },
    }; */

    // axios.post('api',formdata,config);

  };

  return (
    <div className={styles.profile}>
            <div className={styles.box}>
              <div className={styles.imgBox}>
                <img src={previewImg ? previewImg : noImgUrl} alt='noImg' className={styles.img} />
                {/* <div>프로필 이미지</div> */}
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
                <span>닉네임 :  {member.nickname}</span>
              </div>
              <div>
                <span>관심 카테고리 : 축구</span>
              </div>
            </div>
            
    </div>
  );
};

export default UserProfile;