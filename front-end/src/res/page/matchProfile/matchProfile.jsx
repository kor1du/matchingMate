import axios from "axios";
import React, { useState, useEffect } from "react";
import UserProfile from "../../components/matchProfile/profile/userProfile";
import CategoryChart from "../../components/matchProfile/chart/CategoryChart";
import MatchingChart from "../../components/matchProfile/chart/MatchingChart";
import Category from "../../components/matchProfile/category/Category";
import MatchHistory from "../../components/matchProfile/matchHistory/MatchHistory";
import NavMatchingProfile from "../../components/nav/matchingProfile/NavMatchingProfile";
import MatchRating from "../../components/matchProfile/matchRating/matchRating";
import Nav from "../../components/nav/Nav";
import "./matchProfile.css";
import { positions } from "@mui/system";
import { Button } from "react-bootstrap";

const MatchProfile = () => {
  const [menu, setMenu] = useState("home");
  const [profileInfo, setProfileInfo] = useState("");

  const [matchingCountLabelList, setMatchingCountLabelList] = useState([]);
  const [matchingCountDataList, setMatchingCountDataList] = useState([]);
  const [categoryLabelList, setCategoryLabelList] = useState([]);
  const [categoryDataList, setCategoryDataList] = useState([]);

  const token = sessionStorage.getItem("jwtToken");

  const getProfileInfo = async () => {
    const res = await (
      await axios.get("http://localhost:8080/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;

    setProfileInfo(res.data);

    setMatchingCountLabelList(res.data.matchingCountChart.labelList);
    setMatchingCountDataList(res.data.matchingCountChart.dataList);
    setCategoryLabelList(res.data.categoryDistributionChart.labelList);
    setCategoryDataList(res.data.categoryDistributionChart.dataList);
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <>
      <Nav></Nav>
      <div className="container-match-profile">
        <div className="left">
          <NavMatchingProfile></NavMatchingProfile>
        </div>
        <div className="right">
          <UserProfile profileInfo={profileInfo}></UserProfile>
          <Category></Category>

          <MatchHistory></MatchHistory>
          <MatchRating></MatchRating>

          <CategoryChart
            nickname={profileInfo.memberNickname}
            categoryLabelList={categoryLabelList}
            categoryDataList={categoryDataList}
          ></CategoryChart>
          <MatchingChart
            matchingCountDataList={matchingCountDataList}
            matchingCountLabelList={matchingCountLabelList}
          ></MatchingChart>
        </div>
      </div>
    </>
  );
};

export default MatchProfile;
