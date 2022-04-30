package com.matching.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;


public class RatingDTO {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CreateRatingDTO {
        private Long memberId;
        private Long matchingHistoryId;
        private Long targetMemberId;
        private String contents;
        private Float skillPoint;
        private Float mannerPoint;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadRatingDTO {
        private Float avgSkillPoint;
        private Float avgMannerPoint;
        private List<ReadDetailRatingDTO> detailRatingList;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class ReadDetailRatingDTO {
        private Long id;
        private String targetMemberNickname;    // 평점 받은 사람
        private String memberNickname;    // 평점 준사람
        private String contents;
        private Float skillPoint;
        private Float mannerPoint;
        @Temporal(TemporalType.TIMESTAMP)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private Date registerDatetime;
    }
}
