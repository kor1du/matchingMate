package com.matching.system.repository;

import com.matching.system.domain.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {
    @Query(value = "SELECT b.*, mb.under_matching_count " +
            "FROM badge b, (SELECT b.id, LEAD(b.over_matching_count,1,0) OVER(ORDER BY b.over_matching_count DESC) AS under_matching_count FROM badge b) mb " +
            "WHERE mb.id=b.id  AND (:matchingCount >= mb.under_matching_count AND :matchingCount < b.over_matching_count)", nativeQuery = true)
    Optional<Badge> findMyBadge(@Param(value = "matchingCount") Integer matchingCount);

    @Query(value = "SELECT b.* FROM badge b WHERE b.over_matching_count = (SELECT MAX(b1.over_matching_count) FROM badge b1)", nativeQuery = true)
    Optional<Badge> findHighestBadge();

    Optional<Badge> findByOverMatchingCount(Integer overMatchingCount);

}
