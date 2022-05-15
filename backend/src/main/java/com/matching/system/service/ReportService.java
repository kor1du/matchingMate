package com.matching.system.service;

import com.matching.system.domain.*;
import com.matching.system.dto.ReportDTO;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import com.matching.system.repository.MemberRepository;
import com.matching.system.repository.NotificationRepository;
import com.matching.system.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final MemberRepository memberRepository;
    private final NotificationRepository notificationRepository;
    private final JwtTokenUtil jwtTokenUtil;

    // 신고 추가 = 신고하기
    public ResponseMessage createReport(ReportDTO.ReportRegisterDTO reportRegisterDTO, String token) {

        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        // 신고 중복
        Optional<Report> findReport = reportRepository.findByTargetIdAndMemberIdAndTargetMemberIdAndReportTypeAndReportClassify
                (reportRegisterDTO.getTargetId(), memberId, reportRegisterDTO.getTargetMemberId(), reportRegisterDTO.getReportType(), reportRegisterDTO.getReportClassify());

        if (findReport.isPresent()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 같은 내용으로 신고하셨습니다.");

        // 회원
        Member member = memberRepository.findById(memberId).get();
        Member targetMember = memberRepository.findById(reportRegisterDTO.getTargetMemberId()).get();



        // entity
        Report newReport = Report.builder()
                .member(member)
                .targetMember(targetMember)
                .targetId(reportRegisterDTO.getTargetId())
                .reportClassify(reportRegisterDTO.getReportClassify())  // ER001인지>> 문자인ㅅ지
                .reportType(ReportType.valueOf(reportRegisterDTO.getReportType()))
                .contents(reportRegisterDTO.getContents())
                .status(0)
                .build();

        reportRepository.save(newReport);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 등록되었습니다.");
    }

    // 신고 조회 - 전체
    public ResponseData readAllReports() {
        List<ReportDTO.ReportReadDTO> reportReadDTOList = read(1);

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", reportReadDTOList);
    }

    // 신고 조회 - 처리 완료
    public ResponseData readDisposed() {
        List<ReportDTO.ReportReadDTO> reportReadDTOList = read(2);

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", reportReadDTOList);
    }

    // 신고 조회 - 처리 전
    public ResponseData readNotDisposed() {
        List<ReportDTO.ReportReadDTO> reportReadDTOList = read(3);

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", reportReadDTOList);
    }

    // 조회 처리
    private List<ReportDTO.ReportReadDTO> read(int select) {
        List<Report> reports;

        if (select == 1) {
            reports = reportRepository.findAll();
        } else if (select == 2) {
            reports = reportRepository.findByStatus(1);
        } else {
            reports = reportRepository.findByStatus(0);
        }

        List<ReportDTO.ReportReadDTO> reportReadDTOs = reports.stream()
                .map(report -> ReportDTO.ReportReadDTO.builder()
                        .id(report.getId())
                        .memberId(report.getMember()==null?null:report.getMember().getId())
                        .targetMemberId(report.getTargetMember()==null?null:report.getTargetMember().getId())
                        .reportClassify(report.getReportClassify())
                        .reportType(report.getReportType().toString())
                        .contents(report.getContents())
                        .status((report.getStatus() == 1 ? "처리 완료" : "처리 전"))
                        .registerDatetime(report.getRegisterDatetime())
                        .build())
                .collect(Collectors.toList());

        return reportReadDTOs;
    }

    // 신고 처리 -> 처리 완료 - 승인, 거절 구분이 필요
    // 신고 처리 -> 알림도 전송
    public ResponseMessage dispose(ReportDTO.ReportDisposeDTO reportDisposeDTO) {
        // 검색
        Optional<Report> report = reportRepository.findById(reportDisposeDTO.getId());

        if (report.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 신고가 없습니다.");

        // 처리 결과 상태 업데이트
        report.get().setDisposeResult();

        // 알림
        // 신고한 사람 검색
        Member member = memberRepository.findById(report.get().getMember().getId()).get();

        // 신고 당한 알림 저장
        notificationRepository.save(Notification.builder()
                .member(member)
                .notificationType(NotificationType.신고처리)
                .message("신고한 내용이 " + reportDisposeDTO.getResult() + " 되었습니다.")
                .url(null)
                .build()
        );

        if (reportDisposeDTO.getResult().equals("승인")) {
            // 신고 당한 사람 검색
            Member targetMember = memberRepository.findById(report.get().getTargetMember().getId()).get();

            // 신고 당한 알림 저장
            notificationRepository.save(Notification.builder()
                    .member(targetMember)
                    .notificationType(NotificationType.신고처리)
                    .message(report.get().getReportType() + "에서 " + report.get().getReportClassify() + "(으)로 신고되었습니다. 주의해주세요!")
                    .url(null)      // 신고당한 것으로 이동?
                    .build()
            );

        }

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.");
    }

    private String getReportClassify(int reportClassify)
    {
        if (reportClassify == 1)
            return "스팸 및 광고";
        else if (reportClassify == 2)
            return "음란 및 선정성";
        else if (reportClassify == 3)
            return "폭언 및 비속어";
        else
            return "기타";
    }


}
