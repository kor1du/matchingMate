import React, { useState } from "react";

import BoardItem from './boardItem';
import BoardPagination from './BoardPagination';

import styles from './board.module.css'


const Board = (props) => {

  const { boards, getPopularBoards, getBoards, getLocation, lat, lng, liveAddr, categorys, boardDelete } = props;


  const limit = 9;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;


  console.log("보드진입 : 현위치는요? :", liveAddr);
  console.log("보드데이터: ",boards );

  return (
    <div className={styles.container}>
      <div className={styles.boardBox}>
        {boards.slice(offset, offset + limit).map((board) => <BoardItem key={board.id} board={board} categorys={categorys} />)}
      </div>
      
      <div >
          <BoardPagination
            total={boards.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
      </div>
    </div>
  );
}


export default Board;
