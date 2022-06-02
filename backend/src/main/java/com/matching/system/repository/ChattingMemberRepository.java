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

    Optional<ChattingMember> findByChattingRoomIdAndMemberId(Long chattingRoomId, Long memberId);

    @Query("SELECT cm FROM ChattingMember cm " +
            "JOIN FETCH cm.chattingRoom cr " +
            "LEFT JOIN cr.matchingPost " +
            "JOIN FETCH cm.member " +
            "WHERE cm.id=:chattingMemberId")
    Optional<ChattingMember> findById(@Param("chattingMemberId") Long chattingMemberId);

    Optional<ChattingMember> findByMemberId(Long memberId);

}
