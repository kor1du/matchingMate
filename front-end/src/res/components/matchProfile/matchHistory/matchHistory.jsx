import React, {useEffect, useState} from 'react';
import { axiosGet } from '../../axios/Axios';
// import HistoryMain from './historyMain'
import styles from './matchHistory.module.css';
import HistoryPost from './historyPost';
import HistoryMate from './historyMate';

function MatchHistory () {
  // const match_historys = [ {id:1, title  : "매칭내역 1"},{id:2, title  : "매칭내역 2"}] ;
  const [matchingHistories, setMatchingHistories] = useState([]);
  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const readMatchingHistoryList = async () => {
    const res = await (await axiosGet("/profile/history",{Authorization: token})).data;
    console.log(res.data);
    setMatchingHistories(res.data);
  };

  useEffect(() => {
    readMatchingHistoryList();
  }, []);

  return (
    <div>
          { matchingHistories.map( (matchingHistory) => 
                <main className={styles.main} key={matchingHistory.id} >
                    <HistoryPost  matchingPostInfo={matchingHistory.matchingPostDTO}/>
                    <HistoryMate matchingMatesInfo={matchingHistory.historyMembers}/>
                </main>
           )}
    </div>
  );
};

export default MatchHistory;