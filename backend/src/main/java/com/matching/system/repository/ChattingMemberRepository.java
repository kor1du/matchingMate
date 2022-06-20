package com.matching.system.repository;

import com.matching.system.domain.ChattingMember;
import com.matching.system.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChattingMemberRepository extends JpaRepository<ChattingMember, Long> {
    @Query("SELECT DISTINCT cm FROM ChattingMember cm " +
            "JOIN FETCH cm.chattingRoom cr " +
            "JOIN FETCH cr.chattingMemberList " +
            "LEFT JOIN cr.matchingPost " +
            "JOIN FETCH cm.member " +
            "WHERE cm.member=:member")
    List<ChattingMember> findAllByMemberId(@Param("member") Member member);

    @Query("SELECT cm FROM ChattingMember cm " +
            "JOIN FETCH cm.member m " +
            "JOIN FETCH cm.chattingRoom cr " +
            "JOIN FETCH cr.matchingPost mp " +
            "WHERE mp.id=:matchingPostId AND m.id=:memberId")
    Optional<ChattingMember> findByMatchingPostIdAndMemberId(@Param("matchingPostId") Long matchingPostId, @Param("memberId")Long memberId);

    Optional<ChattingMember> findByChattingRoomIdAndMemberId(Long chattingRoomId, Long memberId);

    @Query("SELECT cm FROM ChattingMember cm " +
            "JOIN FETCH cm.chattingRoom cr " +
            "LEFT JOIN cr.matchingPost " +
            "JOIN FETCH cm.member " +
            "WHERE cm.id=:chattingMemberId")
    Optional<ChattingMember> findById(@Param("chattingMemberId") Long chattingMemberId);

    Optional<ChattingMember> findByMemberId(Long memberId);

}
