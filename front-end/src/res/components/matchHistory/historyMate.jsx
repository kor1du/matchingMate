import React from 'react';
import HistoryMateItem from './historyMateItem';
import styles from './historyMate.module.css';

const HistoryMate = () => {
  return (
    <div className={styles.main}>
      <h2>Mate List</h2>
      <HistoryMateItem/>
    </div>
  );
};

export default HistoryMate;