package com.matching.system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class ReportDTO {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class ReportRegisterDTO
    {
        private String targetMemberNickname;
        private String reportType;  // 매칭 공고, 사람, 채팅
        private String reportClassify; // 음란, 욕설 등
        private String contents;
        private Long targetId;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class ReportReadDTO
    {
        private Long id;
        private Long memberId;
        private Long targetMemberId;
        private String reportType;  // 매칭 공고, 사람, 채팅
        private String reportClassify; // 음란, 욕설 등
        private String contents;
        private String status;
        private String registerDatetime;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class ReportDisposeDTO
    {
        private Long id;
        private String result;  // 승인, 거절
    }


}
