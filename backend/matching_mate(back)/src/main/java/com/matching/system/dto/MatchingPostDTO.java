package com.matching.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

public class MatchingPostDTO {


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CreateDTO
    {
        private Long memberId;
        private Long categoryId;
        private String postName;
        private String postContents;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private Date matchingDate;
        @Temporal(TemporalType.TIME)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
        private Date matchingTime;
        private String recommendedSkill;
        private Integer maxNumberOfPeople;
        private String place;
        private String detailPlace;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpdateDTO
    {
        private Long id;
        private Long categoryId;
        private String postName;
        private String postContents;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private Date matchingDate;
        @Temporal(TemporalType.TIME)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
        private Date matchingTime;
        private String recommendedSkill;
        private Integer maxNumberOfPeople;
        private String place;
        private String detailPlace;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadSimpleDTO112312312
    {
        private Long id;
        private Long memberId;
        private String nickname;
        private String categoryName;
        private String postName;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private Date matchingDate;
        @Temporal(TemporalType.TIME)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
        private Date matchingTime;
        private String recommendedSkill;
        private Integer numberOfPeople;
        private Integer maxNumberOfPeople;
        private Integer views;
        private String place;
        private String detailPlace;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadDTO
    {
        private Long id;
        private Long memberId;
        private String nickname;
        private Long categoryId;
        private String categoryName;
        private String categoryImgAddress;
        private String postName;
        private String postContents;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private Date matchingDate;
        @Temporal(TemporalType.TIME)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
        private Date matchingTime;
        private String recommendedSkill;
        private Integer numberOfPeople;
        private Integer maxNumberOfPeople;
        private Integer views;
        private String place;
        private String detailPlace;
        private Integer isCompleted;
        @Temporal(TemporalType.TIMESTAMP)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private Date registerDatetime;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class JoinChattingRoom
    {
        private Long matchingPostId;
        private Long memberId;
    }

}
