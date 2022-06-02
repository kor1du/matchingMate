package com.matching.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.matching.system.jwt.TokenDTO;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

public class MemberDTO {

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
    public static class LoginResponseDTO {
        private TokenDTO tokenDTO;
        private String nickname;
        private String profileImgAddress;
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
    public static class CheckDuplicateNickname
    {
        private String nickname;
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
        private String name;
        private String nickname;
        private String phone;
        private String address;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadMyInfoDTO
    {
        private String userId;
        private String userPw;
        private String birthday;
        private String sex;
        private String name;
        private String nickname;
        private String phone;
        private String address;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadMemberInfoDTO
    {
        private Long id;
        private String userId;
        private String userPw;
        private String birthday;
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
    public static class UpdateLocation {
        private String location;
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
        private Long id;
        private String profileImgAddress;
        private String memberNickname;
        private String profileContent;
        private Integer matchingCount;
        private Float avgSkillPoint;
        private Float avgMannerPoint;
        private BadgeDTO.MemberBadgeDTO badgeImgAddress;

        private MatchingHistoryDTO.ChartDataProcess matchingCountChart;
        private MatchingHistoryDTO.ChartDataProcess categoryDistributionChart;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateImgAddress
    {
        private MultipartFile file;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateProfileContent
    {
        private String profileContent;
    }


}
