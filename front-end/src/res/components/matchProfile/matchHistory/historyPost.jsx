import React from "react";

function HistoryPost(props) {
  const { matchingPostInfo } = props;

  return (
    <div className="info-matching">
      <p className="title">매칭 정보</p>
      <div>
        <p>종목 : {matchingPostInfo.categoryName}</p>
      </div>
      <div className="overflow">
        <p>제목 : {matchingPostInfo.postName}</p>
      </div>
      <div className="overflow">
        <p>날짜 : {matchingPostInfo.matchingDate}</p>
      </div>
      <div>
        <p>시간 : {matchingPostInfo.matchingTime}</p>
      </div>
      <div>
        <p className="overflow">장소 : {matchingPostInfo.place}</p>
      </div>
    </div>
  );
}

export default HistoryPost;
