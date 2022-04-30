import React, { useState } from 'react';
import MatchMain from '../components/matchMain/matchMain';
import MatchProfileNav from '../components/matchProfileNav/matchProfileNav';
import UserProfile from '../components/userProfile/userProfile';
import styles from '../css/matchProfile.module.css/matchProfile.module.css';

const MatchProfile = (props) => {

  const [menu,setMenu] = useState('history');

  function changeMenu(menu) {
    console.log("선택된 메뉴는 ", menu); //테스트
    return setMenu(menu);
  }

  const {member} = props;

  return (
    <>
    <div className={styles.home}>
      <div className={styles.header}></div>
      <MatchProfileNav changeMenu={changeMenu}/>
      <section className={styles.section}>
        <aside className={styles.profile_box}>
          <UserProfile member={member}/>
        </aside>
        <div className={styles.main}>
          <MatchMain menu={menu} />
        </div>
      </section>
      </div>
    </>
  );
};

export default MatchProfile;