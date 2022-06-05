package com.matching.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

public class MatchingPostDTO {


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CreateDTO {
        private Long categoryId;
        private String postName;
        private String postContents;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private Date matchingDate;
        @Temporal(TemporalType.TIME)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private Date matchingTime;
        private String recommendedSkill;
        private Integer maxNumberOfPeople;
        private String place;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpdateDTO {
        private Long id;
        private Long categoryId;
        private String postName;
        private String postContents;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private Date matchingDate;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private Date matchingTime;
        private String recommendedSkill;
        private Integer maxNumberOfPeople;
        private String place;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadSimpleMatchingPostDTO {
        private Long id;
        private String categoryName;
        private String postName;
        private String matchingDate;
        private String matchingTime;
        private String recommendedSkill;
        private Integer numberOfPeople;
        private Integer maxNumberOfPeople;
        private Integer views;
        private String place;
        private String registerDatetime;
        private Integer inChatNumber;

        private String nickname;
        private String profileImgAddress;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadDetailMatchingPostDTO {
        private Long id;
        private String nickname;
        private String profileImgAddress;
        private String categoryName;
        private String categoryImgAddress;
        private String postName;
        private String postContents;
        private String matchingDate;
        private String matchingTime;
        private String recommendedSkill;
        private Integer maxNumberOfPeople;
        private Integer inChatNumber;
        private Integer views;
        private String place;
        private String registerDatetime;
        private Float lat;
        private Float lng;

        private boolean isMyPost;
        private Long chattingRoomId;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadPostOfAdminDTO {
        private Long id;
        private String nickname;
        private String categoryName;
        private String postName;
        private String postContents;
        private String place;
        private String registerDatetime;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class JoinChattingRoom {
        private Long matchingPostId;
        private Long memberId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SearchConditionDTO {
        private Long categoryId;
        private String level;
        private Double lat;
        private Double lng;
    }

}
