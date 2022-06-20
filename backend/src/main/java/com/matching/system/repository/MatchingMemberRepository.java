package com.matching.system.repository;

import com.matching.system.domain.MatchingHistory;
import com.matching.system.domain.MatchingMember;
import com.matching.system.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatchingMemberRepository extends JpaRepository<MatchingMember, Long> {
    @Query("SELECT mm FROM MatchingMember mm " +
            "JOIN FETCH mm.member " +
            "WHERE mm.matchingHistory=:matchingHistory " +
                "AND mm.member!=:member")
    List<MatchingMember> findByMatchingHistoryIdAndMemberIdNot(@Param("matchingHistory") MatchingHistory matchingHistory, @Param("member") Member member);

    @Query("SELECT mm FROM MatchingMember mm " +
            "JOIN FETCH mm.matchingHistory mh " +
            "JOIN FETCH mh.matchingPost mp " +
            "LEFT JOIN mp.category " +
            "JOIN FETCH mm.member " +
            "WHERE mm.member=:member")
    List<MatchingMember> findByMatchingMember(@Param("member")Member member);

    @Query("SELECT mm FROM MatchingMember mm " +
            "JOIN FETCH mm.matchingHistory " +
            "JOIN FETCH mm.member " +
            "WHERE mm.matchingHistory=:matchingHistory")
    List<MatchingMember> findByMatchingHistoryId(@Param("matchingHistory") MatchingHistory matchingHistory);

}
