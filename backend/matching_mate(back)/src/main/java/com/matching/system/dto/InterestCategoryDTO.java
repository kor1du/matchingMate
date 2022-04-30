package com.matching.system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class InterestCategoryDTO {

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateDTO
    {
        private Long categoryId;
        private Long memberId;
        private String region1;
        private String region2;
        private String region3;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateDTO
    {
        private Long id;
        private Long categoryId;
        private Long memberId;
        private String region1;
        private String region2;
        private String region3;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadDTO
    {
        private Long id;
        private Long memberId;
        private Long categoryId;
        private String categoryName;
        private String categoryImgAddress;
        private String region1;
        private String region2;
        private String region3;
    }

}
