/* global kakao */

import React, { useEffect, useState } from "react";
import Nav from "../../components/nav/Nav";

import NavToChat from "../../components/nav/NavToChat";
import { axiosGet } from '../../components/axios/Axios';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from './main.module.css'
import CategoryItem from '../../components/main/categoryItem';
import { FaHotjar,FaStar,FaLocationArrow } from 'react-icons/fa';
import Board from '../../components/main/board';

const Main2 = () => {

  const [boards, setBoards] = useState([]);
  const [liveAddr, setLiveAddr] = useState('');
  const [latitude, setLatitude] = useState("");
  const [longtitue, setLongitude] = useState("");
  const [categorys, setCategorys] = useState();

  const token = sessionStorage.getItem("jwtToken");

  const getPopularBoards = async (lat, lng) => {
    const res = await (await axiosGet(`/popular?lat=${lat}&lng=${lng}`)).data;
    setBoards(res.data);
  };

  // 기본 조회는 최신순 zzzz

  const getBoards = async (lat, lng) => {
    const res = await (await axios.get(`http://localhost:8050/recent?lat=${lat}&lng=${lng}`)).data;
    // const res = await (await axiosGet(`/recent?lat=${lat}&lng=${lng}`)).data;
    console.log("통신데이터", res);
    setBoards(res.data);
  };

  const changeCategory = async (categoryId) => {
    const res = await (await axios.get(`http://localhost:8050/recent?lat=${latitude}&lng=${longtitue}&categoryId=${categoryId}`)).data;
    // const res = await (await axiosGet(`/recent?lat=${lat}&lng=${lng}`)).data;
    console.log("통신데이터", res);
    setBoards(res.data);
  }

  const getLocation = async () => {

    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        getBoards(lat, lng);
        getAddr(lat, lng);
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

  const getCategorys = async () => {

    console.log("카테고리검색시작..");
    const res = await (await axios.get('http://localhost:8050/category')).data;

    setCategorys(res.data);

    console.log("카테고리는..?",res.data);
    // axiosGet("/category").then((res) => {
    //   const data = res.data.data;
    //   setCategorys(data);
    // });
  }

  const updateLocation = (addr, token) => {
    console.log("최근위치 업데이트 시작....");
    axios.put('http://localhost:8050/location', { location: addr }, {
      headers: {
        'Authorization': "Bearer " + token
      }
    })
    console.log("최근위치 업데이트 완료....");
  }

  const getAddr = async (lat, lng) => {
    const geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(lat, lng);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), addrCallback);

  }


  const addrCallback = async (result, status) => {

    console.log("getAddress 진입 !!");

    let liveAddress = '';
    if (status === kakao.maps.services.Status.OK) {
      let address = result[0].address;
      liveAddress = address.region_1depth_name + ' ' + address.region_2depth_name + ' ' + address.region_3depth_name;

      console.log("main 콜백함수에서 현위치 찾는중 :::", liveAddress);

      setLiveAddr(liveAddress);
      sessionStorage.setItem("liveAddress", liveAddress);

      if (token) {
        updateLocation(sessionStorage.getItem("liveAddress"), token);
      }

    }
  };

  useEffect(() => {
    
    getLocation();
    getCategorys();

  }, []);

  return (
      <>
        <NavToChat></NavToChat>
        <Nav></Nav>
        <motion.section>
            <div className={styles.headerBox}>
                <div className={styles.header}>
                    <motion.h2
                        className={styles.liveAddr}
                        animate={{ y: [-300 , 0] }}
                        transition={{  duration: 1 }}
                    >oo님은 현재 {liveAddr} 입니다.</motion.h2>
                </div>
            </div>
            <div className={styles.container}>
                <motion.div className={styles.categoryBox}
                            animate={{ scale: [0.5 , 1] }}
                            transition={{  duration: 1 }}    
                >
                    { 
                      categorys &&
                        categorys.map((item) => <CategoryItem key={item.id} id={item.id} name={item.name} img={item.imgAddress} changeCategory={changeCategory} />)
                    }
                </motion.div> 
                <motion.ul className={`${styles.ull} `}
                    animate={{ scale: [0.5 , 1] }}
                    transition={{  duration: 1 }}    
                >
                  <div className={styles.filter}>
                        <section className={styles.newhot}>
                            <motion.div className={styles.new}
                                whileHover={{scale: 1.1,  ease: "easeIn", duration: 0.2 }}
                            >
                                <FaStar style={{marginRight : "5px"}}/>
                                <span>최신</span>
                            </motion.div>
                            <motion.div className={styles.hot}
                                whileHover={{scale: 1.1,  ease: "easeIn", duration: 0.2 }}
                            >
                                <FaHotjar style={{marginRight : "5px"}}/>
                                <span>인기</span>
                            </motion.div>
                        </section>
                        <motion.div className={styles.location}
                            whileHover={{scale: 1.1,  ease: "easeIn", duration: 0.2 }}
                        >
                            <FaLocationArrow style={{marginRight : "5px"}}/>
                            <span>위치갱신</span>
                        </motion.div>
                    </div>
                  <Board
                    boards={boards}
                    getPopularBoards={getPopularBoards}
                    getBoards={getBoards}
                    getLocation={getLocation}
                    liveAddr={liveAddr}
                    categorys={categorys}
                    lat={latitude}
                    lng={longtitue}
                  />
                </motion.ul> 
        </div>
        </motion.section>
      </>
  );
}

export default Main2;