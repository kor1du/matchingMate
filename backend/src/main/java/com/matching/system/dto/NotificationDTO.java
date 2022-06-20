package com.matching.system.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class NotificationDTO {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadNotificationDTO {
        private Long id;
        private String notificationType;    // 관심 카테고리 알림, 신고 처리 알림
        private String message;
        private String url;
        private String registerDatetime;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TodayNotificationDTO {
        private Long id;
        private String notificationType;    // 관심 카테고리 알림, 신고 처리 알림
        private String message;
        private String registerDatetime;

    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadTodayNotificationDTO {
        List<TodayNotificationDTO> todayNotificationDTOList;

        private Integer noReadCount;
    }
}
