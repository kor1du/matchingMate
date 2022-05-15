package com.matching.system.repository;

import com.matching.system.domain.ChattingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChattingRoomRepository extends JpaRepository<ChattingRoom, Long> {

    @Query("SELECT DISTINCT cr FROM ChattingRoom cr " +
            "JOIN FETCH cr.matchingPost mp " +
            "JOIN FETCH mp.member " +
            "JOIN FETCH cr.chattingMemberList cMember " +
            "JOIN FETCH cMember.member " +
            "JOIN FETCH cr.chattingMessageList cMessage " +
            "JOIN FETCH cMessage.chattingMember cm " +
            "JOIN FETCH cm.member " +
            "WHERE cr.id=:chattingRoomId")
    Optional<ChattingRoom> findById(@Param("chattingRoomId") Long chattingRoomId);


}
