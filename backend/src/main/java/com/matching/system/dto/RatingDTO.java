package com.matching.system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


public class RatingDTO {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CreateRatingDTO {
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
        private String registerDatetime;
    }
}
