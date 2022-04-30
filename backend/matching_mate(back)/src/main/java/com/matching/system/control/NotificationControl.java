package com.matching.system.control;

import com.matching.system.dto.NotificationDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.service.NotificationService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class NotificationControl {
    private final NotificationService notificationService;
    
    // 알림 조회  -> 하루 동안 알림 (메인 페이지)
    @GetMapping("/recent/{id}")
    public ResponseEntity readRecentNotification(@PathVariable(value = "id") Long memberId)
    {
        ResponseData responseData = notificationService.readRecentNotification(memberId);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 알림 내역 조회 -> 전체
    @GetMapping("/matchingProfile/notification/{id}")
    public ResponseEntity readAllNotification(@PathVariable(value = "id") Long memberId)
    {
        ResponseData responseData = notificationService.readAllNotification(memberId);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 알림 내역 조회 -> 관심 카테고리
    @GetMapping("/matchingProfile/notification/interest/{id}")
    public ResponseEntity readInterestNotification(@PathVariable(value = "id") Long memberId)
    {
        ResponseData responseData = notificationService.readInterestNotification(memberId);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 알림 내역 조회 -> 신고
    @GetMapping("/matchingProfile/notification/report/{id}")
    public ResponseEntity readReportNotification(@PathVariable(value = "id") Long memberId)
    {
        ResponseData responseData =  notificationService.readReportNotification(memberId);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 알림 전송 -> 관리자 - 신고 처리,  사용자 - 공고 등록  => 완료


}
