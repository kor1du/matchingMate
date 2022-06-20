import React, { useEffect, useState } from "react";
import { axiosGet } from "../../axios/Axios";
// import HistoryMain from './historyMain'
import HistoryPost from "./historyPost";
import HistoryMate from "./historyMate";
import "./matchHistory.css";
import Pagination from "./Pagination";

const MatchHistory = () => {
  // const match_historys = [ {id:1, title  : "매칭내역 1"},{id:2, title  : "매칭내역 2"}] ;
  const [matchingHistories, setMatchingHistories] = useState([]);
  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const readMatchingHistoryList = async () => {
    const res = await (await axiosGet("/profile/history", { Authorization: token })).data;

    setMatchingHistories(res.data);
  };

  useEffect(() => {
    readMatchingHistoryList();
  }, []);

  return (
    <div className="history-matching">
      <p>매칭내역</p>
      {matchingHistories.slice(offset, offset + limit).map((matchingHistory) => (
        <div className="history" key={matchingHistory.id}>
          <HistoryPost matchingPostInfo={matchingHistory.matchingPostDTO} />
          <HistoryMate matchingMatesInfo={matchingHistory.historyMembers} matchingHistoryId={matchingHistory.id} />
        </div>
      ))}
      <Pagination total={matchingHistories.length} limit={limit} page={page} setPage={setPage} />
    </div>
  );
};

export default MatchHistory;
