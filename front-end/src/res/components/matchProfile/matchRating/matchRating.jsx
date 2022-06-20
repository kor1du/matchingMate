import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { axiosGet } from "../../axios/Axios";
import Pagination from "../matchHistory/Pagination";
import RatingItem from "./ratingItem";
import "./matchRaiting.css";

const MatchRating = () => {
  const [avgMannerRating, setAvgMannerRating] = useState("");
  const [avgSkillRating, setAvgSkillRating] = useState("");
  const [ratingList, setRatingList] = useState([]);
  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const getRatingList = async () => {
    const res = await (await axiosGet("/profile/rating", { Authorization: token })).data;

    setAvgMannerRating(res.data.avgMannerPoint);
    setAvgSkillRating(res.data.avgSkillPoint);
    setRatingList(res.data.detailRatingList);
  };

  useEffect(() => {
    getRatingList();
  }, []);

  return (
    <div className="history-rating">
      <p>평점 내역</p>

      {ratingList.slice(offset, offset + limit).map((rating) => (
        <RatingItem key={rating.id} ratingItem={rating} />
      ))}
      <Pagination total={ratingList.length} limit={limit} page={page} setPage={setPage} />
    </div>
  );
};

export default MatchRating;
