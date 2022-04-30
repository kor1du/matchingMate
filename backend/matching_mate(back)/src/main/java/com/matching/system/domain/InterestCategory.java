package com.matching.system.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "interest_category")
@Builder
public class InterestCategory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "region1", nullable = false)
    private String region1;

    @Column(name = "region2", nullable = true)
    private String region2;

    @Column(name = "region3", nullable = true)
    private String region3;

    public void updateCategory(Category category) { this.category = category; }
    public void updateMember(Member member) { this.member = member; }
    public void updateRegion1(String region1) { this.region1 = region1; }
    public void updateRegion2(String region2) { this.region2 = region2; }
    public void updateRegion3(String region3) { this.region3 = region3; }

}
