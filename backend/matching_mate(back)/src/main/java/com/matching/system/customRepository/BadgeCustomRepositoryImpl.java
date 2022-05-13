package com.matching.system.customRepository;

import com.matching.system.domain.QBadge;
import com.matching.system.dto.BadgeDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class BadgeCustomRepositoryImpl implements BadgeCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<BadgeDTO.MemberBadgeDTO> findMyBadge() {
        QBadge qBadge = QBadge.badge;

        return Optional.empty();
    }

    @Override
    public Optional<BadgeDTO.MemberBadgeDTO> findHighestBadge() {
        QBadge qBadge = QBadge.badge;

        return Optional.empty();
    }

    @Override
    public Optional<BadgeDTO.BadgeStandardDTO> findByImgAddressAndOverMatchingCount(String imgAddress, Integer overMatchingCount) {
        QBadge qBadge = QBadge.badge;

        return Optional.ofNullable(
                jpaQueryFactory.select(Projections.fields(BadgeDTO.BadgeStandardDTO.class,
                                        qBadge.overMatchingCount,
                                        qBadge.imgAddress))
                                .from(qBadge)
                                .where(qBadge.imgAddress.eq(imgAddress)
                                        .and(qBadge.overMatchingCount.eq(overMatchingCount)))
                                .fetchOne()
        );
    }

    @Override
    public Optional<BadgeDTO.BadgeStandardDTO> findById(Long id) {
        QBadge qBadge = QBadge.badge;

        return Optional.ofNullable(
                jpaQueryFactory.select(Projections.fields(BadgeDTO.BadgeStandardDTO.class,
                                        qBadge.id,
                                        qBadge.imgAddress,
                                        qBadge.overMatchingCount))
                                .from(qBadge)
                                .where(qBadge.id.eq(id))
                                .fetchOne()
        );
    }

    @Override
    public void updateBadge(BadgeDTO.BadgeStandardDTO badgeStandardDTO) {
        QBadge qBadge = QBadge.badge;

        jpaQueryFactory.update(qBadge)
                .where(qBadge.id.eq(badgeStandardDTO.getId()))
                .set(qBadge.imgAddress, badgeStandardDTO.getImgAddress())
                .set(qBadge.overMatchingCount, badgeStandardDTO.getOverMatchingCount())
                .execute();
    }

    @Override
    public List<BadgeDTO.BadgeStandardDTO> findAll() {
        QBadge qBadge = QBadge.badge;

        return jpaQueryFactory.select(Projections.fields(BadgeDTO.BadgeStandardDTO.class,
                                        qBadge.id,
                                        qBadge.imgAddress,
                                        qBadge.overMatchingCount))
                .from(qBadge)
                .fetch();
    }
}
