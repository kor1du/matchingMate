import React from 'react';
// import { useEffect } from 'react';
import styles from './historyMain.module.css';

function HistoryPost(props) {
  const {matchingPostInfo} = props;
  
  return (
    <div className={styles.box}>
      <h1>매칭 정보</h1>
      <div className={styles.text}>종목 : {matchingPostInfo.categoryName}</div>
      <div className={styles.text}>날짜 : {matchingPostInfo.matchingDate}</div>
      <div className={styles.text}>시간 : {matchingPostInfo.matchingTime}</div>
      <div className={styles.text}>장소 : {matchingPostInfo.place}</div>
    </div>
    
  );
};

export default HistoryPost;