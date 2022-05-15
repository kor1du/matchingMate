package com.matching.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

public class MemberDTO {

    // 이미지 주소 컬럼 추가
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class SignUpDTO
    {
        private String name;
        private String userId;
        private String userPw;
        private String nickname;
//        @Enumerated(EnumType.STRING)
//        private String roleType;
        private String sex;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private Date birthday;
        private String phone;
        private String address;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CheckDuplicateId
    {
        private String userId;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpdateAccountDTO
    {
        private String userPw;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private Date birthday;
        private String sex;
        private String name;
        private String nickname;
        private String phone;
        private String address;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadMemberDTO
    {
        private Long id;
        private String userId;
        private String userPw;
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private Date birthday;
        private String sex;
        private String name;
        private String nickname;
        private String phone;
        private String address;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LoginInfo{
        private String userId;
        private String userPw;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class HistoryMemberDTO        // -> ratingDTO 로 이동
    {
        private Long id;    // targetMemberId
        private String nickname;
        private Float skillPoint;
        private Float mannerPoint;
        private boolean isAlreadyCompleted;    // member -> targetMember
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadMatchingProfile
    {
        private Long id;    // memberId
        private String profileImgAddress;
        private String profileContent;
        private Integer matchingCount;
        private Float avgSkillPoint;
        private Float avgMannerPoint;
        private BadgeDTO.MemberBadgeDTO badgeImgAddress;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpdateImgAddress
    {
        private MultipartFile file;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpdateProfileContent
    {
        private String profileContent;
    }



}
