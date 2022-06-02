import React from "react";
import HistoryMateItem from "./historyMateItem";
import HistoryMateModal from "./historyMateModal";

const HistoryMate = (props) => {
  const { matchingMatesInfo, matchingHistoryId } = props;
  return (
    <div className="info-mate">
      <p className="title">Mate List</p>
      {matchingMatesInfo.slice(0, 3).map((matchingMate) => (
        <HistoryMateItem
          key={matchingMate.id}
          matchingMate={matchingMate}
          matchingHistoryId={matchingHistoryId}
        />
      ))}
      <div className="more">
        {matchingMatesInfo.length > 3 ? (
          <HistoryMateModal
            matchingMatesInfo={matchingMatesInfo}
            matchingHistoryId={matchingHistoryId}
          ></HistoryMateModal>
        ) : null}
      </div>
    </div>
  );
};

export default HistoryMate;
