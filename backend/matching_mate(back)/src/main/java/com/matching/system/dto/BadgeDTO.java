package com.matching.system.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

public class BadgeDTO {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BadgeStandardDTO
    {
        private Long id;
        private Integer overMatchingCount;
        private String imgAddress;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateBadgeStandardDTO
    {
        private Integer overMatchingCount;
        private MultipartFile badgeImgFile;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateBadgeStandardDTO
    {
        private Long badgeId;
        private Integer overMatchingCount;
        private MultipartFile badgeImgFile;
    }


    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemberBadgeDTO
    {
        private String imgAddress;
    }
}
