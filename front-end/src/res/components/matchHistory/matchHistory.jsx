import React from 'react';
import styles from './matchHistory.module.css';
import HistoryMain from './historyMain';
import HistoryMate from './historyMate';


const MatchHistory = () => {

  // const match_historys = [ {id:1, title  : "매칭내역 1"},{id:2, title  : "매칭내역 2"}] ;

  return (
    <main className={styles.main}>
      <HistoryMain/>
      <HistoryMate/>
    </main>
  );
};

export default MatchHistory;