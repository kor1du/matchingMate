package com.matching.system.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "matching_post")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchingPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "post_name", nullable = false)
    private String postName;

    @Column(name = "post_contents", nullable = false)
    private String postContents;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @Column(name = "matching_date", nullable = true)
    private Date matchingDate;

    @Temporal(TemporalType.TIME)
    @Column(name = "matching_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss", timezone = "Asia/Seoul")
    private Date matchingTime;

    @Column(name = "recommended_skill", nullable = false)
    private String recommendedSkill;

    @Column(name = "number_of_people", columnDefinition = "INT default 1")
    private Integer numberOfPeople;

    @Column(name = "max_number_of_people", nullable = false)
    private Integer maxNumberOfPeople;

    @Column(name = "views", columnDefinition = "INT default 0")
    private Integer views;

    @Column(name = "place", nullable = false)
    private String place;

    @Column(name = "detail_place", columnDefinition = "varchar(255) default '미정'")
    private String detailPlace;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "register_dateTime")
    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date registerDatetime;

    @Column(name = "is_completed", columnDefinition = "TINYINT(1) default 0", length = 1)
    private Integer isCompleted;

//    @OneToOne(mappedBy = "matchingPost", fetch = FetchType.LAZY)
//    private MatchingHistory matchingHistory;


//    @OneToOne(mappedBy = "matchingPost", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private ChattingRoom chattingRoom;


    public void updateCategory(Category category) {
        this.category = category;
    }
    public void updatePostName(String postName) {
        this.postName = postName;
    }
    public void updatePostContents(String postContents) {
        this.postContents = postContents;
    }
    public void updateMatchingDate(Date matchingDate) {
        this.matchingDate = matchingDate;
    }
    public void updateMatchingTime(Date matchingTime) {
        this.matchingTime = matchingTime;
    }
    public void updateRecommendedSKill(String recommendedSkill) {
        this.recommendedSkill = recommendedSkill;
    }
    public void updateMaxNumberOfPeople(Integer maxNumberOfPeople) {
        this.maxNumberOfPeople = maxNumberOfPeople;
    }
    public void updatePlace(String place) {
        this.place = place;
    }
    public void updateDetailPlace(String detailPlace) {
        this.detailPlace = detailPlace;
    }
    public void updatePlusNumberOfPeople() { this.numberOfPeople++; }
    public void updateMinusNumberOfPeople() { this.numberOfPeople--; }
    public void updateIsCompleted() { this.isCompleted = 1; }
    public void updateViews() { this.views++; }

    public void deleteMember() { this.member = null; }
    public void deleteCategory() { this.category = null; }
}

