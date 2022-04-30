import React from 'react';
import styles from '../css/memberProfile.module/memberProfile.module.css';
import { BsFillChatDotsFill } from 'react-icons/bs';

const MemberProfile = (props) => {

  const {member} = props;

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2>계정 설정</h2>
      </div>
      <div className={styles.profileBox}>
        <div className={styles.profile}>
          <p>이름 : {member.name}</p>
          <p>휴대전화번호 : {member.phone}</p>
          <p>주소 : 경북 구미시 옥계동</p>
          <p>생년월일 : 1900-03-03</p>
          <button>계정 정보 수정하기</button>
        </div>
      </div>
      
      <BsFillChatDotsFill size="30" color="yellow"/>
    </div>
  );
};

export default MemberProfile;