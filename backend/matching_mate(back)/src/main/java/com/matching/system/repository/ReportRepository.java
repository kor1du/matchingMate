package com.matching.system.repository;

import com.matching.system.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    @Query("SELECT r FROM Report r " +
            "JOIN FETCH r.member " +
            "JOIN FETCH r.targetMember " +
            "ORDER BY r.id DESC")
    List<Report> findAll();

    @Query("SELECT r FROM Report r " +
            "JOIN FETCH r.member " +
            "JOIN FETCH r.targetMember " +
            "WHERE r.status=:status ")
    List<Report> findByStatus(@Param("status") Integer status);

    @Query("SELECT r FROM Report r " +
            "JOIN FETCH r.member " +
            "JOIN FETCH r.targetMember " +
            "WHERE r.id=:reportId")
    Optional<Report> findById(@Param("reportId") Long reportId);

    Optional<Report> findByTargetIdAndMemberIdAndTargetMemberIdAndReportTypeAndReportClassify(Long targetId, Long memberId, Long targetMemberId, String reportType, Integer reportClassify);

    List<Report> findByMemberId(Long memberId);



    void deleteByTargetMemberId(Long targetMemberId);

}
