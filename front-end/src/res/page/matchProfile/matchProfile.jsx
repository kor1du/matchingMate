import React, { useState, useEffect } from 'react';
import { axiosGet } from '../../components/axios/Axios';
import MatchMain from '../../components/matchProfile/matchMain/matchMain';
import MatchProfileNav from '../../components/matchProfile/matchProfileNav/matchProfileNav';
import UserProfile from '../../components/userProfile/userProfile';
import styles from './matchProfile.module.css';

const MatchProfile = (props) => {

  const [menu,setMenu] = useState('home');
  const [profileInfo, setProfileInfo] = useState("");
  const [ profileImgAddress, setProfileImgAddress ] = useState("");
  const token = "Bearer " + sessionStorage.getItem("jwtToken");
  const {member} = props;

  

  function changeMenu(menu) {
    console.log("선택된 메뉴는 ", menu); //테스트
    return setMenu(menu);
  }
  
  const getMatchingProfileInfo = async () => {
    const res = await (await axiosGet("/profile",{Authorization: token})).data;
    console.log(res);

    setProfileInfo(()=>res.data);
    setProfileImgAddress(()=>res.data.badgeImgAddress.imgAddress);
  };
  
  useEffect(() => {
    getMatchingProfileInfo();
  }, []);

  console.log(profileInfo);
  return (
    <>
    <div className={styles.home}>
      <div className={styles.header}></div>
      <MatchProfileNav changeMenu={changeMenu}/>
      <section className={styles.section}>
        <aside className={styles.profile_box}>
          <img src={profileImgAddress}/>
          <UserProfile profileInfo={profileInfo} member={member}/>
        </aside>
        <div className={styles.main}>
          <MatchMain profileInfo={profileInfo} menu={menu} />
        </div>
      </section>
      </div>
    </>
  );
};

export default MatchProfile;