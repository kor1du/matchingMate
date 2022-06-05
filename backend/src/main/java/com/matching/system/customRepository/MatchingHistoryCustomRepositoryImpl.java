package com.matching.system.customRepository;

import com.matching.system.domain.QCategory;
import com.matching.system.domain.QMatchingHistory;
import com.matching.system.domain.QMatchingMember;
import com.matching.system.domain.QMatchingPost;
import com.matching.system.dto.MatchingHistoryDTO;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MatchingHistoryCustomRepositoryImpl implements MatchingHistoryCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<MatchingHistoryDTO.ChartData> monthlyMatchingCount(Long memberId) {
        QMatchingHistory qMatchingHistory = QMatchingHistory.matchingHistory;
        QMatchingMember qMatchingMember = QMatchingMember.matchingMember;

        StringTemplate formattedDate = Expressions.stringTemplate(
                "DATE_FORMAT({0}, {1})"
                , qMatchingHistory.matchedDatetime
                , ConstantImpl.create("%Y-%m"));

        return jpaQueryFactory.select(Projections.fields(MatchingHistoryDTO.ChartData.class,
                    formattedDate.as("label"),
                    qMatchingMember.member.count().as("data")
                ))
                .from(qMatchingMember, qMatchingHistory)
                .where(qMatchingHistory.id.eq(qMatchingMember.matchingHistory.id))
                .groupBy(formattedDate)
                .groupBy(qMatchingMember.member.id)
                    .having(qMatchingMember.member.id.eq(memberId))
                .orderBy(formattedDate.asc())
                .fetch();
    }

    @Override
    public List<MatchingHistoryDTO.ChartData> categoryDistribution(Long memberId) {
        QCategory qCategory = QCategory.category;
        QMatchingPost qMatchingPost = QMatchingPost.matchingPost;
        QMatchingHistory qMatchingHistory = QMatchingHistory.matchingHistory;
        QMatchingMember qMatchingMember = QMatchingMember.matchingMember;

        return jpaQueryFactory.select(Projections.fields(MatchingHistoryDTO.ChartData.class,
                        qCategory.name.as("label"),
                        qMatchingPost.id.count().as("data")))
                .from(qMatchingMember)

                .leftJoin(qMatchingMember.matchingHistory, qMatchingHistory)
                .on(qMatchingMember.matchingHistory.id.eq(qMatchingHistory.id))

                .leftJoin(qMatchingHistory.matchingPost, qMatchingPost)
                .on(qMatchingHistory.matchingPost.id.eq(qMatchingPost.id))

                .leftJoin(qMatchingPost.category, qCategory)
                .on(qMatchingPost.category.id.eq(qCategory.id))

                .where(qMatchingMember.member.id.eq(memberId))

                .groupBy(qCategory.id)
                .orderBy(qCategory.id.asc())

                .fetch();
    }


}
