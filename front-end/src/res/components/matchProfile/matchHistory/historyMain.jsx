import React from 'react';
import styles from './historyMain.module.css';



const HistoryMain = () => {
  return (
    <div className={styles.box}>
      <h1>매칭 내역 제목</h1>
      <div className={styles.text}>종목 : 축구</div>
      <div className={styles.text}>날짜 : 2022-03-03</div>
      <div className={styles.text}>시간 : 19:00</div>
      <div className={styles.text}>장소 : 금오공대 운동장</div>
    </div>
    
  );
};

export default HistoryMain;