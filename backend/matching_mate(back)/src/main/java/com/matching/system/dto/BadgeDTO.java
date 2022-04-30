package com.matching.system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

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
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemberBadgeDTO
    {
        private Long memberId;
        private Integer memberMatchingCount;
        private String imgAddress;
        private List<BadgeStandardDTO> badgeStandardDTOS;
    }
}
