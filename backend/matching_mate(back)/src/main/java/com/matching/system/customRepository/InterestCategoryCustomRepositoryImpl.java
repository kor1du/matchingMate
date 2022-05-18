package com.matching.system.customRepository;

import com.matching.system.domain.QCategory;
import com.matching.system.domain.QInterestCategory;
import com.matching.system.domain.QMember;
import com.matching.system.dto.InterestCategoryDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class InterestCategoryCustomRepositoryImpl implements InterestCategoryCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public boolean findByMemberIdAndCategoryIdAndRegion1AndRegion2AndRegion3(Long memberId, Long categoryId, String region1, String region2, String region3) {
        QInterestCategory qInterestCategory = QInterestCategory.interestCategory;
        QMember qMember = QMember.member;
        QCategory qCategory = QCategory.category;

        Integer alreadyExist = jpaQueryFactory.selectOne()
                .from(qInterestCategory)
                .leftJoin(qInterestCategory.category, qCategory).fetchJoin()
                .leftJoin(qInterestCategory.member, qMember).fetchJoin()
                .where(qMember.id.eq(memberId)
                        .and(qCategory.id.eq(categoryId))
                        .and(qInterestCategory.region1.eq(region1))
                        .and(qInterestCategory.region2.eq(region2))
                        .and(qInterestCategory.region3.eq(region3)))
                .fetchFirst();

        return alreadyExist != null;
    }

    @Override
    public void updateInterestCategory(InterestCategoryDTO.UpdateDTO updateDTO) {
        QInterestCategory qInterestCategory = QInterestCategory.interestCategory;

        QCategory qCategory = QCategory.category;

        // 카테고리는?
        jpaQueryFactory.update(qInterestCategory)
                .where(qInterestCategory.id.eq(updateDTO.getId()))
//                .set(qInterestCategory.category, )
                .set(qInterestCategory.region1, updateDTO.getRegion1())
                .set(qInterestCategory.region2, updateDTO.getRegion2())
                .set(qInterestCategory.region3, updateDTO.getRegion3())
                .execute();
    }

    @Override
    public void deleteInterestCategory(Long interestCategoryId) {
        QInterestCategory qInterestCategory = QInterestCategory.interestCategory;

        jpaQueryFactory.delete(qInterestCategory)
                .where(qInterestCategory.id.eq(interestCategoryId))
                .execute();
    }

    // 관심카테고리가 1개인가?
    @Override
    public Optional<InterestCategoryDTO.ReadDTO> findByMemberId(Long memberId) {
        QInterestCategory qInterestCategory = QInterestCategory.interestCategory;
        QCategory qCategory = QCategory.category;
        QMember qMember = QMember.member;

        return Optional.ofNullable(
            jpaQueryFactory.select(Projections.fields(InterestCategoryDTO.ReadDTO.class,
                            qInterestCategory.id,
                            qInterestCategory.category.id,
                            qInterestCategory.category.name,
                            qInterestCategory.region1,
                            qInterestCategory.region2,
                            qInterestCategory.region3))
                    .from(qInterestCategory)
                    .leftJoin(qInterestCategory.category, qCategory).fetchJoin()
                    .leftJoin(qInterestCategory.member, qMember).fetchJoin()
                    .where(qInterestCategory.member.id.eq(memberId))
                    .fetchOne()
        );
    }


}
