/* global kakao */

import React, { useEffect, useState } from "react";
import Nav from "../../components/nav/Nav";

import NavToChat from "../../components/nav/NavToChat";
import { axiosGet } from "../../components/axios/Axios";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./main.module.css";
import CategoryItem from "../../components/main/categoryItem";
import { FaHotjar, FaStar, FaLocationArrow } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { TiThSmallOutline } from "react-icons/ti";
import Board from "../../components/main/board";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD

=======
>>>>>>> origin/junwoo7
const Main2 = () => {
  const [boards, setBoards] = useState([]);
  const [liveAddr, setLiveAddr] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitue, setLongitude] = useState("");
  const [categorys, setCategorys] = useState();

  const [selectCategoryId, setSelectCategoryId] = useState("");
  const [selectCategoryMenu, setSelectCategoryMenu] = useState(1);

  const token = sessionStorage.getItem("jwtToken");

  const navigate = useNavigate();

<<<<<<< HEAD
  // 기본 조회는 최신순 zzzz
  const getBoards = async (lat, lng) => {
    const res = await (await axios.get(`http://localhost:8080/recent?lat=${lat}&lng=${lng}`)).data;
    // const res = await (await axiosGet(`/recent?lat=${lat}&lng=${lng}`)).data;
    console.log("통신데이터", res);
    setBoards(res.data);
    setSelectCategoryId("");
=======
  
  // 기본 조회는 최신순 zzzz
  const getBoards = async (lat, lng) => {
    const res = await (await axios.get(` https://2adb-60-253-18-218.jp.ngrok.io/recent?lat=${lat}&lng=${lng}`)).data;
    // const res = await (await axiosGet(`/recent?lat=${lat}&lng=${lng}`)).data;
    console.log("통신데이터", res);

    setBoards(res.data);
    setSelectCategoryId("");

>>>>>>> origin/junwoo7
  };

  const getPopularBoards = async (lat, lng) => {
    if (selectCategoryId) {
      const res = await (await axiosGet(`/popular?lat=${lat}&lng=${lng}&categoryId=${selectCategoryId}`)).data;
      setBoards(res.data);
    } else {
      const res = await (await axiosGet(`/popular?lat=${lat}&lng=${lng}`)).data;
      setBoards(res.data);
    }
  };

  const getRecentBoards = async (lat, lng) => {
    if (selectCategoryId) {
      const res = await (
<<<<<<< HEAD
        await axios.get(`http://localhost:8080/recent?lat=${lat}&lng=${lng}&categoryId=${selectCategoryId}`)
=======
        await axios.get(
          ` https://2adb-60-253-18-218.jp.ngrok.io/recent?lat=${lat}&lng=${lng}&categoryId=${selectCategoryId}`
        )
>>>>>>> origin/junwoo7
      ).data;
      // const res = await (await axiosGet(`/recent?lat=${lat}&lng=${lng}`)).data;
      console.log("통신데이터", res);
      setBoards(res.data);
    } else {
<<<<<<< HEAD
      const res = await (await axios.get(`http://localhost:8080/recent?lat=${lat}&lng=${lng}`)).data;
=======
      const res = await (await axios.get(` https://2adb-60-253-18-218.jp.ngrok.io/recent?lat=${lat}&lng=${lng}`)).data;
>>>>>>> origin/junwoo7
      // const res = await (await axiosGet(`/recent?lat=${lat}&lng=${lng}`)).data;
      console.log("통신데이터", res);
      setBoards(res.data);
    }
  };

  const changeCategory = async (categoryId) => {
    const res = await (
<<<<<<< HEAD
      await axios.get(`http://localhost:8080/recent?lat=${latitude}&lng=${longtitue}&categoryId=${categoryId}`)
=======
      await axios.get(
        ` https://2adb-60-253-18-218.jp.ngrok.io/recent?lat=${latitude}&lng=${longtitue}&categoryId=${categoryId}`
      )
>>>>>>> origin/junwoo7
    ).data;
    // const res = await (await axiosGet(`/recent?lat=${lat}&lng=${lng}`)).data;
    console.log("통신데이터", res);
    setBoards(res.data);
    setSelectCategoryId(categoryId);
  };

  const getInterestCategory = async () => {
    setSelectCategoryMenu(2);
    const res = await (
<<<<<<< HEAD
      await axios.get(`http://localhost:8080/myInterest`, {
=======
      await axios.get(` https://2adb-60-253-18-218.jp.ngrok.io/myInterest`, {
>>>>>>> origin/junwoo7
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    console.log("관심카테고리데이터 : ", res.data);
    setCategorys(res.data);
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);
          getBoards(lat, lng);
          getAddr(lat, lng);

          console.log("위도 : " + latitude + " 경도 : " + longtitue); // 일단 but never used 에러창 방지
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
    } else {
      alert("GPS를 지원하지 않습니다");
      return;
    }
  };

  const getCategorys = async () => {
    setSelectCategoryMenu(1);

    console.log("카테고리검색시작..");
<<<<<<< HEAD
    const res = await (await axios.get("http://localhost:8080/category")).data;
=======
    const res = await (await axios.get(" https://2adb-60-253-18-218.jp.ngrok.io/category")).data;
>>>>>>> origin/junwoo7

    setCategorys(res.data);

    console.log("카테고리는..?", res.data);
    // axiosGet("/category").then((res) => {
    //   const data = res.data.data;
    //   setCategorys(data);
    // });
  };

  const updateLocation = (addr, token) => {
    console.log("최근위치 업데이트 시작....");
    axios.put(
<<<<<<< HEAD
      "http://localhost:8080/location",
=======
      " https://2adb-60-253-18-218.jp.ngrok.io/location",
>>>>>>> origin/junwoo7
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
<<<<<<< HEAD
            <motion.div className={styles.location} whileHover={{ scale: 1.1, ease: "easeIn", duration: 0.2 }}>
              <FaLocationArrow style={{ marginRight: "5px", marginLeft: "5px" }} />
              <span className={styles.location}>위치 갱신하기</span>
=======
            <motion.div className={styles.location} animate={{ y: [-300, 0] }} transition={{ duration: 1 }} whileHover={{ scale: 1.1, ease: "easeIn", duration: 0.2 }}>
              <FaLocationArrow style={{ marginRight: "5px", marginLeft: "5px" }} />
              <span className={styles.locationText}>위치 갱신하기</span>
>>>>>>> origin/junwoo7
            </motion.div>
            <motion.h2 className={styles.liveAddr} animate={{ y: [-300, 0] }} transition={{ duration: 1 }}>
              {token === null ? "방문자" : sessionStorage.getItem("nickname")} 님은 현재{" "}
              <span className={styles.addrText}>{liveAddr}</span> 입니다.
            </motion.h2>
          </div>
        </div>
        <div className={styles.container}>
<<<<<<< HEAD
          <ul className={styles.categoryMenu}>
=======
          <motion.ul className={styles.categoryMenu}  animate={{ scale: [0.5, 1] }} transition={{ duration: 1 }}>
>>>>>>> origin/junwoo7
            <li
              className={`${styles.categoryMenuItem} ${selectCategoryMenu === 1 ? styles.selected : ""}`}
              onClick={() => getCategorys()}
            >
              전체
            </li>
            <li
              className={`${styles.categoryMenuItem} ${selectCategoryMenu === 2 ? styles.selected : ""}`}
              onClick={() => getInterestCategory()}
            >
              관심 카테고리
            </li>
<<<<<<< HEAD
          </ul>
=======
          </motion.ul>
>>>>>>> origin/junwoo7
          <motion.div className={styles.categoryBox} animate={{ scale: [0.5, 1] }} transition={{ duration: 1 }}>
            {categorys &&
              categorys.map((item) => (
                <CategoryItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  img={item.imgAddress}
                  changeCategory={changeCategory}
                />
              ))}
          </motion.div>
          <motion.ul className={`${styles.ull} `} animate={{ scale: [0.5, 1] }} transition={{ duration: 1 }}>
            <div className={styles.filter}>
              <section className={styles.newhot}>
                <motion.div
                  className={styles.all}
                  whileHover={{ scale: 1.1, ease: "easeIn", duration: 0.2 }}
                  onClick={() => getBoards(latitude, longtitue)}
                >
                  <TiThSmallOutline style={{ marginRight: "5px" }} />
                  <span className={styles.jua}>전체보기</span>
                </motion.div>
                <motion.div
                  className={styles.new}
                  whileHover={{ scale: 1.1, ease: "easeIn", duration: 0.2 }}
                  onClick={() => getRecentBoards(latitude, longtitue)}
                >
                  <FaStar style={{ marginRight: "5px" }} />
                  <span className={styles.jua}>최신</span>
                </motion.div>
                <motion.div
                  className={styles.hot}
                  whileHover={{ scale: 1.1, ease: "easeIn", duration: 0.2 }}
                  onClick={() => getPopularBoards(latitude, longtitue)}
                >
                  <FaHotjar style={{ marginRight: "5px" }} />
                  <span className={styles.jua}>인기</span>
                </motion.div>
              </section>
              <motion.div
                className={styles.register}
                whileHover={{ scale: 1.1, ease: "easeIn", duration: 0.2 }}
                onClick={() => {
                  navigate("/register", {
                    state: {
                      categorys: categorys,
                      liveAddr: liveAddr,
                    },
                  });
                }}
              >
                <BsPencilSquare style={{ marginRight: "5px" }} />
                <span className={styles.jua}>모집하기</span>
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
};

<<<<<<< HEAD
export default Main2;
=======
export default Main2;
>>>>>>> origin/junwoo7
