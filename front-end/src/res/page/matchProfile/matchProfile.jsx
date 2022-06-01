import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MatchMain from '../../components/matchProfile/matchMain/matchMain';
//import { axiosGet } from '../../components/axios/Axios';

import MatchProfileNav from '../../components/matchProfile/matchProfileNav/matchProfileNav';
import UserProfile from '../../components/userProfile/userProfile';
import styles from './matchProfile.module.css';

const MatchProfile = () => {

  const [menu,setMenu] = useState('home');
  const [profileInfo, setProfileInfo] = useState("");

  const [matchingCountLabelList, setMatchingCountLabelList] = useState([]);
  const [matchingCountDataList, setMatchingCountDataList] = useState([]);
  const [categoryLabelList, setCategoryLabelList] = useState([]);
  const [categoryDataList, setCategoryDataList] = useState([]);

  const token = sessionStorage.getItem("jwtToken");

  function changeMenu(menu) {
    console.log("선택된 메뉴는 ", menu); //테스트
    return setMenu(menu);
  }
  
  const getProfileInfo = async () => {

    const res = await (await axios.get('http://localhost:8080/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )).data;

    console.log("매칭프로필조회결과: ",res);

    setProfileInfo(res.data);

    setMatchingCountLabelList(res.data.matchingCountChart.labelList);  
    setMatchingCountDataList(res.data.matchingCountChart.dataList);
    setCategoryLabelList(res.data.categoryDistributionChart.labelList);  
    setCategoryDataList(res.data.categoryDistributionChart.dataList);
    
  };
  
  useEffect(() => {
    getProfileInfo();
  }, []);


  return (
    <>
    <div className={styles.home}>
      <div className={styles.header}></div>
      <MatchProfileNav changeMenu={changeMenu}/>
      <section className={styles.section}>
        <aside className={styles.profile_box}>
          <UserProfile profileInfo={profileInfo} />
        </aside>
        <div className={styles.main}>
          <MatchMain profileInfo={profileInfo} menu={menu} 
              matchingCountLabelList={matchingCountLabelList} matchingCountDataList={matchingCountDataList}
              categoryLabelList={categoryLabelList} categoryDataList={categoryDataList}
          />
        </div>
      </section>
      </div>
    </>
  );
};

export default MatchProfile;