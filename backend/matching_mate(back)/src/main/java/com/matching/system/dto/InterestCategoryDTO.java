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
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateDTO
    {
        private Long id;
        private Long categoryId;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadDTO
    {
        private Long id;
        private Long categoryId;
        private String categoryName;
        private String categoryImgAddress;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadMyInterestDTO
    {
        private Long id;
        private String name;
        private String imgAddress;
    }


}
