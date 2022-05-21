package com.matching.system.customRepository;

import com.matching.system.domain.MatchingPost;
import com.matching.system.domain.QCategory;
import com.matching.system.domain.QMatchingPost;
import com.matching.system.dto.MatchingPostDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.thymeleaf.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MatchingPostCustomRepositoryImpl implements MatchingPostCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    private final QMatchingPost qMatchingPost = QMatchingPost.matchingPost;
    private final QCategory qCategory = QCategory.category;

    @Override
    public List<MatchingPostDTO.ReadSimpleMatchingPostDTO> findByRecentCategoryPosts(Long categoryId, String address, String level) {
//        QMatchingPost qMatchingPost = QMatchingPost.matchingPost;
//        QCategory qCategory = QCategory.category;

        return jpaQueryFactory.select(Projections.fields(MatchingPostDTO.ReadSimpleMatchingPostDTO.class,
                            qMatchingPost.id,
                            qMatchingPost.postName,
                            qMatchingPost.matchingDate,
                            qMatchingPost.matchingTime,
                            qMatchingPost.recommendedSkill,
                            qMatchingPost.numberOfPeople,
                            qMatchingPost.maxNumberOfPeople,
                            qMatchingPost.views,
                            qMatchingPost.place,
                            qMatchingPost.detailPlace,
                            qMatchingPost.registerDatetime,
                            qCategory.name))
                .from(qMatchingPost)
                .leftJoin(qMatchingPost.category, qCategory).fetchJoin()
                .where(
                        eqCategoryId(categoryId),
                        eqLevel(level)
                        .and(qMatchingPost.place.eq(address))
                        .and(qMatchingPost.matchingDate.goe(Expressions.currentDate()))
                        .and(qMatchingPost.matchingTime.goe(Expressions.currentTimestamp()))
                        .and(qMatchingPost.isCompleted.eq(0))
                )
                .orderBy(qMatchingPost.id.desc())
                .fetch();
    }

    @Override
    public List<MatchingPostDTO.ReadSimpleMatchingPostDTO> findByPopularCategoryPosts(Long categoryId, String address, String level) {
        return jpaQueryFactory.select(Projections.fields(MatchingPostDTO.ReadSimpleMatchingPostDTO.class,
                        qMatchingPost.id,
                        qMatchingPost.postName,
                        qMatchingPost.matchingDate,
                        qMatchingPost.matchingTime,
                        qMatchingPost.recommendedSkill,
                        qMatchingPost.numberOfPeople,
                        qMatchingPost.maxNumberOfPeople,
                        qMatchingPost.views,
                        qMatchingPost.place,
                        qMatchingPost.detailPlace,
                        qMatchingPost.registerDatetime,
                        qCategory.name))
                .from(qMatchingPost)
                .leftJoin(qMatchingPost.category, qCategory).fetchJoin()
                .where(
                        eqCategoryId(categoryId),
                        eqLevel(level)
                        .and(qMatchingPost.place.eq(address))
                        .and(qMatchingPost.matchingDate.goe(Expressions.currentDate()))
                        .and(qMatchingPost.matchingTime.goe(Expressions.currentTimestamp()))
                        .and(qMatchingPost.isCompleted.eq(0))
                )
                .orderBy(qMatchingPost.views.desc())
                .fetch();
    }

    private BooleanExpression eqCategoryId(Long categoryId)
    {
        if (categoryId != null)
            return null;

        return qCategory.id.eq(categoryId);
    }

    private BooleanExpression eqLevel(String level)
    {
        if (StringUtils.isEmpty(level))
            return null;

        return qMatchingPost.recommendedSkill.eq(level);
    }

    @Override
    public Optional<MatchingPostDTO.ReadDetailMatchingPostDTO> findByDetailMatchingPost(Long matchingPostId) {

        return Optional.empty();
    }

    @Override
    public Optional<MatchingPost> findById(Long matchingPostId) {
        return Optional.empty();
    }

    @Override
    public List<MatchingPost> findAll() {
        return null;
    }

    @Override
    public List<MatchingPost> findByMemberId(Long memberId) {
        return null;
    }

    @Override
    public List<MatchingPost> findByCategoryId(Long categoryId) {
        return null;
    }
}
