import React, { useState } from "react";
import MatchMain from "../components/matchMain/matchMain";
import UserProfile from "../components/userProfile/userProfile";
import styles from "../css/matchProfile.module.css/matchProfile.module.css";

const MatchProfile = (props) => {
  const [menu, setMenu] = useState("history");

  const { member } = props;

  return (
    <>
      <div className={styles.home}>
        <div className={styles.header}></div>
        <section className={styles.section}>
          <aside className={styles.profile_box}>
            <UserProfile member={member} />
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