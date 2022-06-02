import React from 'react';

const ratingItem = ({ratingItem}) => {
    return (
        <div>
            <p>등록일 : {ratingItem.registerDatetime}</p>
            <p>닉네임 : {ratingItem.memberNickname}</p>
            <p>매너 점수 : {ratingItem.mannerPoint}</p>
            <p>기술 점수 : {ratingItem.skillPoint}</p>
            <p>내용 : {ratingItem.contents}</p>
            
        </div>
    );
};

export default ratingItem;