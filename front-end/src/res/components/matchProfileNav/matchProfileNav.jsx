import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './matchProfileNav.module.css';

const MatchProfileNav = (props) => {

  const {changeMenu} = props;

  return (
    <nav className={styles.nav}>
        <ul className={styles.ul}>
<<<<<<< HEAD
=======
          <li className={styles.li} onClick={()=> changeMenu('home')}>홈</li>
>>>>>>> origin/jungYH
          <li className={styles.li} onClick={()=> changeMenu('history')}>매칭 내역</li>
          <li className={styles.li} onClick={()=> changeMenu('rating')}>평점</li>
          <li className={styles.li} onClick={()=> changeMenu('notice')}>알림 목록</li>
          <li className={styles.li} onClick={()=> changeMenu('category')}>관심 카테고리</li>
        </ul>
    </nav>
  );
};

export default MatchProfileNav;