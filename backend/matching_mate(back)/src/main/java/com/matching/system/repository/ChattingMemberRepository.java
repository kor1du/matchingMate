package com.matching.system.repository;

import com.matching.system.domain.ChattingMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChattingMemberRepository extends JpaRepository<ChattingMember, Long> {
//    @Query("SELECT cm FROM ChattingMember cm join fetch cm.chattingRoom WHERE cm.member_id=:memberId")
    List<ChattingMember> findAllByMemberId(Long memberId);

    Optional<ChattingMember> findByChattingRoomIdAndMemberId(Long chattingRoomId, Long memberId);

    Optional<ChattingMember> findByMemberId(Long memberId);

    Integer countByChattingRoomId(Long chattingRoomId);


}
