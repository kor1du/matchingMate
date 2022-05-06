import React, { useEffect, useState } from 'react';
// import { axiosGet } from '../../axios/Axios';

const BoardDetail = (props) => {

  // const { id } = props;

  // const [board, setBoard] = useState();

  // const getBoard = async () => {
  //   const res = await (await axiosGet(`/matchingPost/detail/${id}`)).data;
  //   console.log("통신데이터", res);
  //   setBoard(res.data);
  // };

  useEffect(() => {
    // getBoard();
  }, []);

  return (
    <div>
      {/* <h1>제목 : {board.title}</h1> */}
      <p>내용~~~~~~~~~~~~</p>
    </div>
  );
};

export default BoardDetail;