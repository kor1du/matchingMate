package com.matching.system.repository;

import com.matching.system.domain.Category;
import com.matching.system.domain.InterestCategory;
import com.matching.system.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterestCategoryRepository extends JpaRepository<InterestCategory, Long> {

    @Query("SELECT DISTINCT ic FROM InterestCategory ic " +
            "JOIN FETCH ic.category " +
            "JOIN FETCH ic.member " +
            "WHERE ic.member=:memberId")
    List<InterestCategory> findByMemberId(@Param("memberId") Member member);

//    @Query(value = "SELECT ic.* FROM interest_category ic" +
//            "WHERE ic.category_id=:categoryId AND ( ic.region1 LIKE %:region% OR ic.region2 LIKE %:region% OR ic.region3 LIKE %:region%) ", nativeQuery = true)
    @Query("SELECT DISTINCT ic FROM InterestCategory ic " +
            "JOIN FETCH ic.category " +
            "JOIN FETCH ic.member " +
            "WHERE ic.category=:category " +
            "AND ( ic.region1 LIKE %:region% " +
            "OR ic.region2 LIKE %:region% " +
            "OR ic.region3 LIKE %:region% )")
    List<InterestCategory> findByInterestCategoryMember(@Param("category") Category category, @Param("region") String region);

    Optional<InterestCategory> findByMemberIdAndCategoryId(Long memberId, Long categoryId);
}
