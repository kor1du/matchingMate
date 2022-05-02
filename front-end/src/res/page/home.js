// import Body from "./Body";
import HomeHeader from "../components/home/HomeHeader";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import HomeCarousel from "../components/home/HomeCarousel";
import Board from "../components/home-board/HomeBoard";
import NavToChat from "../components/nav/NavToChat";
import { axiosGet } from "../components/axios/Axios";

function Home() {
  const [boards, setBoards] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longtitue, setLongitude] = useState("");

  const getPopularBoards = async () => {
    const res = await (await axiosGet("/popular")).data;
    setBoards(res.data);
  };

  // 기본 조회는 최신순

  const getBoards = async () => {
    const res = await (await axiosGet("")).data;
    console.log("통신데이터", res);
    setBoards(res.data);
  };

  const categoryFilter = (e, category) => {
    e.preventDefault();
    const filterData = boards.filter(
      (board) => board.categoryName === category
    );
    setBoards(filterData);
  };

  const getAddress = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    console.log("위도 :", latitude);
    console.log("경도 :", longtitue);
  };

  useEffect(() => {
    getAddress();
    getBoards();
  }, []);

  return (
    <div className="Home">
      <NavToChat></NavToChat>
      <Nav></Nav>
      <HomeHeader></HomeHeader>
      <HomeCarousel categoryFilter={categoryFilter}></HomeCarousel>
      <Board
        boards={boards}
        getPopularBoards={getPopularBoards}
        getBoards={getBoards}
      />
    </div>
  );
}

export default Home;
