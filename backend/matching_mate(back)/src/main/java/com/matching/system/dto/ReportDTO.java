package com.matching.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

public class ReportDTO {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class ReportRegisterDTO
    {
        private Long memberId;
        private Long targetMemberId;
        private String reportType;  // 매칭 공고, 사람, 채팅
        private Integer reportClassify; // 음란, 욕설 등
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
        @Temporal(TemporalType.TIMESTAMP)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private Date registerDatetime;
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
