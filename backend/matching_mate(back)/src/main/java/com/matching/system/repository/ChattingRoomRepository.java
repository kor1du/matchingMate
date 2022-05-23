package com.matching.system.repository;

import com.matching.system.domain.ChattingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChattingRoomRepository extends JpaRepository<ChattingRoom, Long> {

    @Query("SELECT DISTINCT cr FROM ChattingRoom cr " +
            "LEFT JOIN cr.matchingPost mp " +
            "LEFT JOIN mp.member " +
            "JOIN FETCH cr.chattingMemberList cMember " +
            "JOIN FETCH cMember.member " +
            "JOIN FETCH cr.chattingMessageList cMessage " +
            "JOIN FETCH cMessage.chattingMember cm " +
            "JOIN FETCH cm.member " +
            "WHERE cr.id=:chattingRoomId")
    Optional<ChattingRoom> findById(@Param("chattingRoomId") Long chattingRoomId);

    @Query("SELECT DISTINCT cr FROM ChattingRoom cr " +
            "LEFT JOIN cr.matchingPost mp " +
            "LEFT JOIN mp.member " +
            "WHERE cr.id=:chattingRoomId")
    Optional<ChattingRoom> existRoom(@Param("chattingRoomId") Long chattingRoomId);


    List<ChattingRoom> findByMatchingPostId(Long matchingPostId);
}
