package com.matching.system.customRepository;

import com.matching.system.domain.QChattingMember;
import com.matching.system.domain.QChattingRoom;
import com.matching.system.domain.QMatchingPost;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Date;


@Repository
@RequiredArgsConstructor
public class MatchingPostCustomRepositoryImpl implements MatchingPostCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Date getMatchingDate(Long chattingRoomId) {
        QChattingRoom qChattingRoom = QChattingRoom.chattingRoom;
        QMatchingPost qMatchingPost = QMatchingPost.matchingPost;

        return jpaQueryFactory.select(qMatchingPost.matchingDate)
                .from(qChattingRoom)
                .leftJoin(qChattingRoom.matchingPost, qMatchingPost).fetchJoin()
                .on(qChattingRoom.matchingPost.id.eq(qMatchingPost.id))
                .where(qChattingRoom.id.eq(chattingRoomId))
                .fetchFirst();
    }

    @Override
    public Integer getJoinChatNumber(Long matchingPostId) {
        QChattingRoom qChattingRoom = QChattingRoom.chattingRoom;
        QChattingMember qChattingMember = QChattingMember.chattingMember;
        QMatchingPost qMatchingPost = QMatchingPost.matchingPost;


        Long countChatMemberNumber = jpaQueryFactory.select( qChattingMember.count() )
                .from(qChattingMember)
                .leftJoin(qChattingMember.chattingRoom, qChattingRoom).fetchJoin()
                .on(qChattingMember.chattingRoom.id.eq(qChattingRoom.id))
                .leftJoin(qChattingRoom.matchingPost, qMatchingPost).fetchJoin()
                .on(qChattingRoom.matchingPost.id.eq(qMatchingPost.id))
//                .groupBy(qMatchingPost.id)
//                .having(qMatchingPost.id.eq(matchingPostId))
                .where(qMatchingPost.id.eq(matchingPostId))
                .fetchOne();

        return countChatMemberNumber.intValue();
    }
}
