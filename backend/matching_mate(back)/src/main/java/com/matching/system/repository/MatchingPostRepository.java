package com.matching.system.repository;

import com.matching.system.domain.Category;
import com.matching.system.domain.MatchingPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchingPostRepository extends JpaRepository<MatchingPost, Long> {
    @Query("SELECT mp FROM MatchingPost mp " +
            "LEFT JOIN mp.member m " +
            "LEFT JOIN mp.category " +
            "WHERE mp.isCompleted = 0 " +
                "AND DATE_FORMAT(now(), '%Y-%m-%d') <= mp.matchingDate " +
                "AND mp.place LIKE :address% " +
            "ORDER BY mp.id DESC")
    List<MatchingPost> findByRecentPosts(@Param("address") String address);

    @Query("SELECT mp FROM MatchingPost mp " +
            "LEFT JOIN mp.member " +
            "JOIN FETCH mp.category " +
            "WHERE mp.category=:category " +
                "AND mp.isCompleted = 0 " +
                "AND DATE_FORMAT(now(), '%Y-%m-%d') <= mp.matchingDate " +
                "AND mp.place LIKE :address% " +
            "ORDER BY mp.id DESC")
    List<MatchingPost> findByRecentCategoryPosts(@Param("category") Category category, @Param("address") String address);

    @Query("SELECT mp FROM MatchingPost mp " +
            "LEFT JOIN mp.member " +
            "LEFT JOIN mp.category " +
            "WHERE mp.isCompleted = 0 " +
                "AND DATE_FORMAT(now(), '%Y-%m-%d') <= mp.matchingDate " +
                "AND mp.place LIKE :address% " +
            "ORDER BY mp.views DESC")
    List<MatchingPost> findByPopularPosts(@Param("address") String address);

    @Query("SELECT mp FROM MatchingPost mp " +
            "LEFT JOIN mp.member " +
            "JOIN FETCH mp.category " +
            "WHERE mp.category=:category " +
                "AND mp.isCompleted = 0 " +
                "AND DATE_FORMAT(now(), '%Y-%m-%d') <= mp.matchingDate " +
                "AND mp.place LIKE :address% " +
            "ORDER BY mp.views DESC")
    List<MatchingPost> findByPopularCategoryPosts(@Param("category") Category category, @Param("address") String address);

    @Query("SELECT mp FROM MatchingPost mp " +
            "LEFT JOIN mp.member m " +
            "LEFT JOIN mp.category " +
            "WHERE mp.id=:matchingPostId")
    Optional<MatchingPost> findById(@Param("matchingPostId") Long matchingPostId);

    @Query("SELECT mp FROM MatchingPost mp " +
            "LEFT JOIN mp.member " +
            "LEFT JOIN mp.category " +
            "ORDER BY mp.id")
    List<MatchingPost> findAll();

    List<MatchingPost> findByMemberId(Long memberId);

    List<MatchingPost> findByCategoryId(Long categoryId);

    @Query("SELECT mp FROM MatchingPost mp WHERE mp.category=:category")
    List<MatchingPost> findByExistCategory(@Param("category") Category category);
}
