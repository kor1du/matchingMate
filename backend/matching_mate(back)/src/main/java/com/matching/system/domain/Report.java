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
@Table(name = "report")
@Builder
public class Report {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_member_id")
    private Member targetMember;

    @Column(name = "report_classify", nullable = false)
    private Integer reportClassify; // 음란, 욕설 및 혐오, 등

    @Column(name = "contents", nullable = false)
    private String contents;

    @Column(name = "target_id", nullable = false)
    private Long targetId;

    @Column(name = "report_type", nullable = false)
    private String reportType;      // 매칭 공고, 사람, 채팅

    @Column(name = "status", columnDefinition = "TINYINT default 0", length = 1)
    private Integer status;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "register_datetime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date registerDatetime;

    public void setDisposeResult()
    {
        this.status = 1;
    }

    public void deleteMember() { this.member = null; }
    public void deleteTargetMember() { this.targetMember = null; }
}
