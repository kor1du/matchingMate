package com.matching.system.control;

import com.matching.system.dto.ReportDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.filter.ResponseMessage;
import com.matching.system.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class ReportControl {
    private final ReportService reportService;

    // 신고 추가 = 신고하기     -> O
    @PostMapping("/report/create")
    public ResponseEntity createReport(@RequestBody ReportDTO.ReportRegisterDTO reportRegisterDTO) {
        ResponseMessage responseMessage = reportService.createReport(reportRegisterDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 신고 조회  -> 전체     -> O
    @GetMapping("/admin/report")
    public ResponseEntity readAllReports() {
        ResponseData responseData = reportService.readAllReports();

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 신고 조회  -> 처리 완료      -> O
    @GetMapping("/admin/report/disposed")
    public ResponseEntity readDisposed() {
        ResponseData responseData = reportService.readDisposed();

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 신고 조회  -> 처리 전       -> O
    @GetMapping("/admin/report/notDisposed")
    public ResponseEntity readNotDisposed() {
        ResponseData responseData = reportService.readNotDisposed();

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 신고 처리      -> O
    @PostMapping("/admin/report/dispose")
    public ResponseEntity disposeReports(@RequestBody ReportDTO.ReportDisposeDTO reportDisposeDTO) {
        ResponseMessage responseMessage = reportService.dispose(reportDisposeDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

}
