package com.matching.system.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "rating")
public class Rating {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matching_history_id")
    private MatchingHistory matchingHistory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_member_id")
    private Member targetMember;

    @Column(name = "manner_point", nullable = false)
    private Float mannerPoint;

    @Column(name = "skill_point", nullable = false)
    private Float skillPoint;

    @Column(name = "contents")
    private String contents;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "register_datetime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date registerDatetime;

    public void deleteMember() { this.member = null; }
    public void deleteTargetMember() { this.targetMember = null; }
}
