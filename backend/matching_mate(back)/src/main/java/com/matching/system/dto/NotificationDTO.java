package com.matching.system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {
    private Long id;
    private String notificationType;    // 관심 카테고리 알림, 신고 처리 알림
    private String message;
    private String url;
    private String registerDateTIme;
}
