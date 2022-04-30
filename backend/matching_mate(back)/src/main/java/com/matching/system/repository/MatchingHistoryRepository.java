package com.matching.system.repository;

import com.matching.system.domain.MatchingHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MatchingHistoryRepository extends JpaRepository<MatchingHistory, Long> {

//    @Query(value = "SELECT mh.*, mp.* FROM matching_history mh, matching_post mp WHERE mh.matching_post_id = mp.id", nativeQuery = true)
//    @Query("SELECT mh FROM MatchingHistory mh JOIN FETCH mh.matchingPost mp JOIN FETCH mh.member WHERE mp.member=:member")
//    List<MatchingHistory> findByMemberHistory(@Param("member") Member memberId, Pageable pageable);

    Optional<MatchingHistory> findById(Long id);

    //sdfsdfsdfsdfsdfsadfsdfsd
//    @Query("SELECT DISTINCT mh FROM MatchingHistory mh " +
//            "JOIN FETCH mh.matchingMemberList " +
//            "JOIN FETCH mh.matchingPost mp ")
    Page<MatchingHistory> findAll(Pageable pageable);
}
