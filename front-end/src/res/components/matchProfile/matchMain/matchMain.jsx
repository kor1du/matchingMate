import React from 'react';
import MatchHistory from '../matchHistory/matchHistory';
import MatchRating from '../matchRating/matchRating';
import Notice from '../../notice/notice';
import Category from '../category/category';

const MatchMain = (props) => {

  const {menu} = props;


  if(menu === 'history') {
    return (
      <MatchHistory/>
    )
  } else if(menu === 'rating') {
    return (
      <MatchRating/>
    )
  } else if(menu === 'notice') {
    return (
      <Notice/>
    )
  } else if(menu === 'category') {
    return (
      <Category/>
    )
  }

  return (
    <>
      <h2>기본..메인..리턴 안보일 예정</h2>
    </>
  );
};

export default MatchMain;