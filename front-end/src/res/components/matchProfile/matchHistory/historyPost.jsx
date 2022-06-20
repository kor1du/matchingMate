import React from "react";

function HistoryPost(props) {
  const { matchingPostInfo } = props;

  return (
    <div className="info-matching">
      <p className="title">매칭 정보</p>
      <p>종목 : {matchingPostInfo.categoryName}</p>
      <p className="overflow">제목 : {matchingPostInfo.postName}</p>
      <p className="overflow">날짜 : {matchingPostInfo.matchingDate}</p>
      <p>시간 : {matchingPostInfo.matchingTime}</p>
      <p className="overflow">장소 : {matchingPostInfo.place}</p>
    </div>
  );
}

export default HistoryPost;
