package com.matching.system.dto;

import lombok.*;
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
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateCategoryDTO
    {
        private String name;
        private MultipartFile categoryImgFile;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpdateCategoryDTO
    {
        private Long categoryId;
        private String name;
        private MultipartFile categoryImgFile;
    }

    @Getter
    public static class ReadCategoryNameDTO
    {
        private String name;
    }


}
