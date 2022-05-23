import React from 'react';
import MatchHistory from '../matchHistory/matchHistory';
import MatchRating from '../matchRating/matchRating';
import Notice from '../../notice/notice';
import Category from '../category/category';
import styles from './matchMain.module.css'
import ProfileContent from './mainProfileContent'

const MatchMain = (props) => {

  const {menu} = props;
  const profileInfo=props.profileInfo;

  if(menu === 'history') {
    return (
      <MatchHistory/>
    )
  } else if(menu === 'rating') {
    return (
      <MatchRating />
    )
  } else if(menu === 'notice') {
    return (
      <Notice/>
    )
  } else if(menu === 'category') {
    return (
      <Category />
    )
  }
  return (
    <div className={styles.main_container}>
      <ProfileContent profileInfo={profileInfo} profileContent={profileInfo.profileContent}/>
    </div>
  );
};

export default MatchMain;