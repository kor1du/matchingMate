// import Body from "./Body";
<<<<<<< HEAD
import HomeHeader from "../components/home/HomeHeader";
import React from "react";
import Nav from "../components/Nav/Nav";
import HomeCarousel from "../components/home/HomeCarousel";
import Board from "../components/home-board/HomeBoard";
import NavToChat from "../components/Nav/NavToChat";
import NavPagination from "../components/Nav/NavPagination";

function Home() {
=======
/* global kakao */
import HomeHeader from "../components/home/HomeHeader";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import HomeCarousel from "../components/home/HomeCarousel";
import Board from "../components/home-board/HomeBoard";
import NavToChat from "../components/nav/NavToChat";
// import { axiosGet } from '../axios/Axios';
import axios from "axios";
import { axiosGet } from "../components/axios/Axios";

<<<<<<< HEAD
const Home = () => {
  
  const [liveAddr, setLiveAddr] = useState('');
=======

const Home = () => {
  const [liveAddr, setLiveAddr] = useState("");
>>>>>>> origin/junwoo7
  const [latitude, setLatitude] = useState("");
  const [longtitue, setLongitude] = useState("");
  const [categorys, setCategorys] = useState();

  const token = sessionStorage.getItem("jwtToken");
<<<<<<< HEAD
  console.log("home화면토큰",token);

  const getLocation = async () => {

    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        getAddr(lat, lng);
        console.log('위도 : ' + latitude + ' 경도 : ' + longtitue); // 일단 but never used 에러창 방지
      }, function (error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
=======
  console.log("home화면토큰", token);

  const getLocation = async () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);
          getAddr(lat, lng);
          console.log("607코드수정 위도 : " + lat + " 경도 : " + lng); // 일단 but never used 에러창 방지
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
>>>>>>> origin/junwoo7
    } else {
      alert("GPS를 지원하지 않습니다");
      return;
    }
  };

  const getCategorys = async () => {
<<<<<<< HEAD

    console.log("카테고리검색시작..");
    const res = await (await axios.get('http://localhost:8080/category')).data;

    setCategorys(res.data);

    console.log("카테고리는..?",res.data);
=======
    console.log("카테고리검색시작..");
    const res = await (await axios.get(" https://2adb-60-253-18-218.jp.ngrok.io/category")).data;

    setCategorys(res.data);

    console.log("카테고리는..?", res.data);
>>>>>>> origin/junwoo7
    // axiosGet("/category").then((res) => {
    //   const data = res.data.data;
    //   setCategorys(data);
    // });
<<<<<<< HEAD
  }
=======
  };
>>>>>>> origin/junwoo7

  const updateLocation = (addr, token) => {
    console.log("최근위치 업데이트 시작....");
    axios.put(
      " https://2adb-60-253-18-218.jp.ngrok.io/location",
      { location: addr },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("최근위치 업데이트 완료....");
  };

  const getAddr = async (lat, lng) => {
    const geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(lat, lng);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), addrCallback);
  };

  const addrCallback = async (result, status) => {
    console.log("getAddress 진입 !!");

    let liveAddress = "";
    if (status === kakao.maps.services.Status.OK) {
      let address = result[0].address;
      liveAddress = address.region_1depth_name + " " + address.region_2depth_name + " " + address.region_3depth_name;

      console.log("home 콜백함수에서 현위치 찾는중 :::", liveAddress);

      setLiveAddr(liveAddress);
      sessionStorage.setItem("liveAddress", liveAddress);

      if (token) {
        updateLocation(sessionStorage.getItem("liveAddress"), token);
      }
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    
=======
>>>>>>> origin/junwoo7
    getLocation();
    getCategorys();
  }, []);

>>>>>>> origin/jungYH
  return (
    <div className="Home">
      <NavToChat></NavToChat>
      <Nav></Nav>
<<<<<<< HEAD
      <HomeHeader></HomeHeader>
      <HomeCarousel></HomeCarousel>
      <Board></Board>
      <NavPagination></NavPagination>
    </div>
  );
}
=======
      <HomeHeader liveAddr={liveAddr} categorys={categorys}></HomeHeader>
      {/* <HomeCarousel
        categoryFilter={categoryFilter}
        categorys={categorys}
      ></HomeCarousel>
      <Board
        boards={boards}
        getPopularBoards={getPopularBoards}
        getBoards={getBoards}
        getLocation={getLocation}
        lat={latitude}
        lng={longtitue}
      /> */}
    </div>
  );
};
>>>>>>> origin/jungYH

export default Home;
