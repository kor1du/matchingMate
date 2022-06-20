package com.matching.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

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
        private String registerDatetime;

        private Integer noReadChatCount;
        private String modifiedDatetime;

        private Integer isCompleted;
        private Long myChattingMemberId;
    }

    @Getter     @Builder    @Setter
    @NoArgsConstructor    @AllArgsConstructor
    public static class ChattingRoomInDTO
    {
        public Long chattingRoomId;
    }


    @Getter     @Builder    @Setter
    @NoArgsConstructor    @AllArgsConstructor
    public static class SendMessageDTO
    {
        public String token;
        public Long roomId;
        public String message;
    }

    // 방 입장 -> 채팅방 가입자 + 메시지
    @Getter     @Builder
    @NoArgsConstructor    @AllArgsConstructor
    public static  class ReadChattingMessageAndMemberDTO
    {
        private Long id; // room PK
        private Long postMemberId;  // 만든 사람
        private String place;
        private String matchingDate;
        private String matchingTime;
        private Long myMemberId;    // 자기 id
        private Long chattingMemberId;
        private Integer numberOfPeople;
        private Integer maxNumberOfPeople;
        private List<ReadChattingMessageDTO> readMessageList;
        private List<ReadChattingMemberDTO> readMemberList;


        private Integer isCompleted;
    }

    // 매칭 멤버 조회  ( 참여자 + 공고자 )
    @Getter     @Builder
    @NoArgsConstructor    @AllArgsConstructor
    public static class ReadChattingMemberDTO
    {
        private Long chattingMemberId;    // chattingmemberId
        private Long memberId;
        private String nickname;
        private String profileImgAddress;
        private Float avgSkillPoint;
        private Float avgMannerPoint;
        private boolean isReady;

        private Integer priority;
    }


    // 메시지 조회
    @Getter     @Builder
    @NoArgsConstructor    @AllArgsConstructor
    public static class ReadChattingMessageDTO
    {
        public Long chattingMessageId;     // message PK
        public Long memberId;
        public String nickname;
        public String profileImgAddress;
        public String message;
        private String registerDatetime;

    }

    // 준비상태 업데이트
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateReadyState
    {
        private Long chattingMemberId;    // chattingMemberId;
        private Boolean ready;
        private Long roomId;
    }

    // 준비상태 답변
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ServerResponse
    {
        private String message;
        private String sender;
    }

    // 준비 완료
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompleteMatching
    {
        private Long chattingRoomId;    // chattingRoomId
        private String place;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private Date matchingTime;
    }


    // 퇴장 및 삭제
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DeleteChattingRoom
    {
        private Long chattingRoomId;
        private Long chattingMemberId;
    }



}
