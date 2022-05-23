/* global kakao */
import HomeHeader from "../components/home/HomeHeader";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import HomeCarousel from "../components/home/HomeCarousel";
import Board from "../components/home-board/HomeBoard";
import NavToChat from "../components/nav/NavToChat";
// import { axiosGet } from '../axios/Axios';
import axios from 'axios';


function Home() {
  const [boards, setBoards] = useState([]);
  const [liveAddr, setLiveAddr] = useState('');
  const [latitude, setLatitude] = useState("");
  const [longtitue, setLongitude] = useState("");

  const getPopularBoards = async (lat, lng) => {
    // const res = await (await axiosGet("/popular")).data;
    const res = await (await axios.get(`http://localhost:8050/popular?lat=${lat}&lng=${lng}`)).data;
    setBoards(res.data);
  };

  // 기본 조회는 최신순 zz

  const getBoards = async (lat, lng) => {
    // const res = await (await axiosGet("")).data;
    const res = await (await axios.get(`http://localhost:8050/recent?lat=${lat}&lng=${lng}`)).data;
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

  const getLocation = async () => {

    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        getBoards(lat, lng);
        alert('위도 : ' + lat + ' 경도 : ' + lng);
        console.log('위도 : ' + latitude + ' 경도 : ' + longtitue); // 일단 but never used 에러창 방지
      }, function (error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
      return;
    }
  }

  const geocoder = new kakao.maps.services.Geocoder();
  let coord = new kakao.maps.LatLng(latitude, longtitue);
  const getAddress = function (result, status) {

    console.log("getAddress 진입 !!");

    let liveAddress = '';
    if (status === kakao.maps.services.Status.OK) {
      let address = result[0].address;
      liveAddress = address.region_1depth_name + ' ' + address.region_2depth_name + ' ' + address.region_3depth_name;

      setLiveAddr(liveAddress);
      sessionStorage.setItem("liveAddress", liveAddress);
    }
  };

  useEffect(() => {
    getLocation().then(() => geocoder.coord2Address(coord.getLng(), coord.getLat(), getAddress));

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
        getLocation={getLocation}
        liveAddr={liveAddr}
        lat={latitude}
        lng={longtitue}
      />
    </div>
  );
}

export default Home;
