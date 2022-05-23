package com.matching.system.repository;

import com.matching.system.domain.MatchingHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchingHistoryRepository extends JpaRepository<MatchingHistory, Long> {

    Optional<MatchingHistory> findById(Long id);

    @Query("SELECT  mh FROM MatchingHistory mh " +
//            "JOIN FETCH mh.matchingMemberList " +
            "JOIN mh.matchingPost mp " +
            "JOIN mp.member")
    List<MatchingHistory> findAll();
}
