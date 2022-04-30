// import Body from "./Body";
import HomeHeader from "../components/home/HomeHeader";
import React from "react";
import Nav from "../components/Nav/Nav";
import HomeCarousel from "../components/home/HomeCarousel";
import Board from "../components/home-board/HomeBoard";
import NavToChat from "../components/Nav/NavToChat";
import NavPagination from "../components/Nav/NavPagination";

function Home() {
  return (
    <div className="Home">
      <NavToChat></NavToChat>
      <Nav></Nav>
      <HomeHeader></HomeHeader>
      <HomeCarousel></HomeCarousel>
      <Board></Board>
      <NavPagination></NavPagination>
    </div>
  );
}

export default Home;
