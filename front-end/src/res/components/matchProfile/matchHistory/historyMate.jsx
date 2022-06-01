import React from 'react';
import HistoryMateItem from './historyMateItem';
import styles from './historyMate.module.css';

const HistoryMate = (props) => {
  const {matchingMatesInfo, matchingHistoryId} = props;
  return (
    <div className={styles.main}>
      <h2>Mate List</h2>
      { matchingMatesInfo.map( (matchingMate) => 
              <HistoryMateItem key={matchingMate.id} matchingMate={matchingMate} matchingHistoryId={matchingHistoryId}/>
      )}

    </div>
  );
};

export default HistoryMate;