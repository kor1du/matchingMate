import React from 'react';
import styles from './matchInfo.module.css';


const MatchInfo = () => {
  return (
    <div className={styles.container}>
      <section>
        <div>
          <h2>매칭 횟수 관련</h2>
        </div>
      </section>
      <section>
        <div>
          <h2>매너 평가</h2>
        </div>
      </section>
      <section>
        <div>
          <h2>실력 평가</h2>
        </div>
      </section>
    </div>
  );
};

export default MatchInfo;