package com.matching.system.repository;

import com.matching.system.domain.MatchingPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchingPostRepository extends JpaRepository<MatchingPost, Long> {
    @Query(value = "SELECT mp.* FROM matching_post mp WHERE mp.is_completed = 0 AND DATE_FORMAT(now(), '%Y-%m-%d') <= mp.matching_date ORDER BY mp.id DESC", nativeQuery = true)       // 수정 필요
    List<MatchingPost> findByRecentPosts(Pageable pageable);


    @Query(value = "SELECT mp.* FROM matching_post mp WHERE mp.is_completed = 0 AND DATE_FORMAT(now(), '%Y-%m-%d') <= mp.matching_date ORDER BY mp.views DESC", nativeQuery = true)       // 수정 필요
    List<MatchingPost> findByPopularPosts(Pageable pageable);

    Optional<MatchingPost> findById(Long id);

    List<MatchingPost> findByMemberId(Long memberId);

    List<MatchingPost> findByCategoryId(Long categoryId);
}
