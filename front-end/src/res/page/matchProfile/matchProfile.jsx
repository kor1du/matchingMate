import axios from "axios";
import React, { useState, useEffect } from "react";
import UserProfile from "../../components/matchProfile/profile/userProfile";
import CategoryChart from "../../components/matchProfile/chart/CategoryChart";
import MatchingChart from "../../components/matchProfile/chart/MatchingChart";
import Category from "../../components/matchProfile/category/Category";
import MatchHistory from "../../components/matchProfile/matchHistory/MatchHistory";

const MatchProfile = () => {
  const [menu, setMenu] = useState("home");
  const [profileInfo, setProfileInfo] = useState("");

  const [matchingCountLabelList, setMatchingCountLabelList] = useState([]);
  const [matchingCountDataList, setMatchingCountDataList] = useState([]);
  const [categoryLabelList, setCategoryLabelList] = useState([]);
  const [categoryDataList, setCategoryDataList] = useState([]);

  const token = sessionStorage.getItem("jwtToken");

  function changeMenu(menu) {
    console.log("선택된 메뉴는 ", menu); //테스트
    return setMenu(menu);
  }

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
      <div className="container-match-profile">
        <UserProfile profileInfo={profileInfo}></UserProfile>
        <CategoryChart
          nickname={profileInfo.memberNickname}
          categoryLabelList={categoryLabelList}
          categoryDataList={categoryDataList}
        ></CategoryChart>
        <MatchingChart
          matchingCountDataList={matchingCountDataList}
          matchingCountLabelList={matchingCountLabelList}
        ></MatchingChart>
        <Category></Category>
        <MatchHistory></MatchHistory>
      </div>
    </>
  );
};

export default MatchProfile;
