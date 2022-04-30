package com.matching.system.repository;

import com.matching.system.domain.ChattingMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChattingMessageRepository extends JpaRepository<ChattingMessage, Long> {
    List<ChattingMessage> findByChattingRoomIdAndChattingMemberId(Long roomId, Long memberId);

}
