import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { axiosGet } from '../../axios/Axios';
import RatingItem from '../../matchRating/ratingItem'

const MatchRating = () => {

  const [avgMannerRating, setAvgMannerRating] = useState("");
  const [avgSkillRating, setAvgSkillRating] = useState("");
  const [ratingList, setRatingList] = useState([]);
  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const getRatingList = async () => {
    const res = await (await axiosGet("/profile/rating",{Authorization: token})).data;
    console.log(res.data.detailRatingList);

    setAvgMannerRating(res.data.avgMannerPoint);
    setAvgSkillRating(res.data.avgSkillPoint);
    setRatingList(res.data.detailRatingList);

  };

  useEffect(() => {
    getRatingList();
  }, []);
  

  return (
    <div>
      <div>
        <h1>평점 평균</h1>
        
        <p>매너 평점 : {avgMannerRating}</p>
        <p>기술 평점 : {avgSkillRating}</p>
      </div>

      
      {ratingList.map((rating) => 
        <RatingItem key={rating.id} ratingItem={rating}/>
      )}
    </div>
  );
};

export default MatchRating;