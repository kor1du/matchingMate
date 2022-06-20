package com.matching.system.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "chatting_room")
public class ChattingRoom {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matching_post_id")
    private MatchingPost matchingPost;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "register_datetime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date registerDatetime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date modifiedDatetime;

    @OneToMany(mappedBy = "chattingRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ChattingMember> chattingMemberList = new HashSet<>();

    public void addChattingMember(ChattingMember chattingMember)
    {
        this.chattingMemberList.add(chattingMember);

    }

    @OneToMany(mappedBy = "chattingRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ChattingMessage> chattingMessageList = new HashSet<>();

    public void deleteMatchingPost() { this.matchingPost = null; }
    public void updateModifiedDatetime(Date modifiedDatetime) { this.modifiedDatetime = modifiedDatetime; }

}
