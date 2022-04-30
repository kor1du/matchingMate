package com.matching.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

public class ChattingDTO {

    @Getter     @Builder
    @NoArgsConstructor    @AllArgsConstructor
    public static class ChattingRoomRegisterDTO
    {
        private Long matchingPostId;
        private Long memberId;
    }

    @Getter     @Builder
    @NoArgsConstructor    @AllArgsConstructor
    public static class ChattingRoomListDTO
    {
        private Long id;
        private Long matchingPostId;
        private String matchingPostName;
        private Integer numberOfPeople;
        private Integer maxNumberOfPeople;
        private Integer roomNumberOfPeople;
        @Temporal(TemporalType.TIMESTAMP)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private Date registerDatetime;
    }

    @Getter     @Builder    @Setter
    @NoArgsConstructor    @AllArgsConstructor
    public static class ChattingRoomInOutDTO
    {
        public Long roomId;
        public Long memberId;
    }

    @Getter     @Builder
    @NoArgsConstructor    @AllArgsConstructor
    public static class SendMessageDTO
    {
        public Long roomId;
        public Long memberId;
        public String message;
    }

    // 방 입장 -> 채팅방 가입자 + 메시지
    @Getter     @Builder
    @NoArgsConstructor    @AllArgsConstructor
    public static  class ReadChattingMessageAndMemberDTO
    {
        private Long id; // room PK
        private Long postMemberId;  // 만든 사람
        private Long myMemberId;    // 자기 id
        private Long chattingMemberId;
        private List<ReadChattingMessageDTO> readMessageList;
        private List<ReadChattingMemberDTO> readMemberList;
    }

    // 매칭 멤버 조회  ( 참여자 + 공고자 )
    @Getter     @Builder
    @NoArgsConstructor    @AllArgsConstructor
    public static class ReadChattingMemberDTO
    {
        private Long chattingMemberId;    // chattingmemberId
        private Long memberId;
        private String nickname;
        private Float avgSkillPoint;
        private Float avgMannerPoint;
        private boolean isReady;
    }


    // 메시지 조회
    @Getter     @Builder
    @NoArgsConstructor    @AllArgsConstructor
    public static class ReadChattingMessageDTO
    {
        public Long chattingMessageId;     // message PK
        public Long memberId;
        public String nickname;
        public String message;
        @Temporal(TemporalType.TIMESTAMP)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private Date registerDatetime;
    }

    // 준비상태 업데이트
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateReadyState
    {
        private Long chattingMemberId;    // chattingMemberId;
        private boolean ready;
    }

    // 준비 완료
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompleteMatching
    {
        private Long chattingRoomId;    // chattingRoomId
    }

}
