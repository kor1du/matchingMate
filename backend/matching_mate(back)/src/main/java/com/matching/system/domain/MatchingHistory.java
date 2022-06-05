package com.matching.system.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "matching_history")
@Builder
public class MatchingHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matching_post_id")
    private MatchingPost matchingPost;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "matched_dateTime", columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date matchedDatetime;

    @OneToMany(mappedBy = "matchingHistory", cascade = CascadeType.ALL)
    List<Rating> ratingList = new ArrayList<>();

    @OneToMany(mappedBy = "matchingHistory", cascade = CascadeType.ALL, orphanRemoval = true)

    private List<MatchingMember> matchingMemberList = new ArrayList<>();

    public void addMatchingMember(MatchingMember matchingMember)
    {
        this.matchingMemberList
                .add(matchingMember);
    }


}
