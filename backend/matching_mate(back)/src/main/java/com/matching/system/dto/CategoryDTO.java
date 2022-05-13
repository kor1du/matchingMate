package com.matching.system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

public class CategoryDTO {

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReadCategoryDTO{
        private Long id;
        private String name;
        private String imgAddress;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateCategoryDTO
    {
        private String name;
        private MultipartFile categoryImgFile;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpdateCategoryDTO
    {
        private Long categoryId;
        private String name;
        private MultipartFile categoryImgFile;
    }


}
