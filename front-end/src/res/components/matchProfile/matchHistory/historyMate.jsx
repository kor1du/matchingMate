import React from 'react';
import HistoryMateItem from './historyMateItem';
import styles from './historyMate.module.css';

const HistoryMate = (props) => {
  const {matchingMatesInfo} = props;

  return (
    <div className={styles.main}>
      <h2 className={styles.mateList}>Mate List</h2>

      { matchingMatesInfo.map( (matchingMate) => 
              <HistoryMateItem key={matchingMate.id} matchingMate={matchingMate}/>
      )}

    </div>
  );
};

export default HistoryMate;