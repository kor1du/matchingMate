package com.matching.system.customRepository;

import java.util.Date;

public interface MatchingPostCustomRepository {
    Date getMatchingDate(Long chattingRoomId);

    Integer getJoinChatNumber(Long matchingPostId);
}
