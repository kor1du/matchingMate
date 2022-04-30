package com.matching.system.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
public class Member implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;
    @Column(name = "user_pw", nullable = false)
    private String userPw;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MemberAuthority> memberAuthorities = new ArrayList<>();

    public void grantAuthority(MemberAuthority memberAuthority)
    {
        this.memberAuthorities.add(memberAuthority);
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.memberAuthorities.stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthority().toString()))
                .collect(Collectors.toList());
    }

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "sex", nullable = false, columnDefinition = "TINYINT", length = 1)
    private Integer sex;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "birthday", nullable = false)
    private Date birthday;

    @Column(name = "phone", nullable = false, length = 15)
    private String phone;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "profile_content")
    private String profileContent;

    @Column(name = "profile_img_address")
    private String profileImgAddress;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date registerDatetime;

    @Column(name = "matching_count", columnDefinition = "int default 0")
    private Integer matchingCount;


//    // 평점
//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Rating> ratingList;
//
//    // 신고
//    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Report> reportList;

    // 관심 카테고리
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InterestCategory> interestCategoryList;

    // 알림
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notificationList;

    // matching member
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchingMember> matchingMemberList;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChattingMember> chattingMemberList;


    // 매칭 공고
//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<MatchingPost> matchingPostList;

    public void updateUserPw(String userPw) { this.userPw = userPw; }
    public void updateName(String name) { this.name = name; }
    public void updateNickname(String nickname) { this.name = nickname  ; }
    public void updatePhone(String phone) { this.name = phone; }
    public void updateAddress(String address) { this.name = address; }
    public void updateBirthday(Date birthday) { this.birthday = birthday; }
    public void updateSex(Integer sex) { this.sex = sex; }
    public void updateProfileImgAddress(String profileImgAddress) { this.profileImgAddress = profileImgAddress; }
    public void updateProfileContent(String profileContent) { this.profileContent = profileContent; }
    public void updatePlusMatchingCount() { this.matchingCount++; }
}
