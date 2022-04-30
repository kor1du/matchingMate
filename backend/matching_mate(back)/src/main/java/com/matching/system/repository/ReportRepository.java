package com.matching.system.repository;

import com.matching.system.domain.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Page<Report> findAll(Pageable pageable);

    Page<Report> findByStatus(Integer status, Pageable pageable);

    Optional<Report> findByTargetIdAndMemberIdAndTargetMemberIdAndReportTypeAndReportClassify(Long targetId, Long memberId, Long targetMemberId, String reportType, Integer reportClassify);

    List<Report> findByMemberId(Long memberId);

    List<Report> findByTargetMemberId(Long memberId);

    void deleteByTargetMemberId(Long memberId);
}
