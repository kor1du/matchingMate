package com.matching.system.control;

import com.matching.system.response.ResponseData;
import com.matching.system.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class NotificationControl {
    private final NotificationService notificationService;
    
    // 알림 조회  -> 하루 동안 알림 (메인 페이지)
    @GetMapping("/notification")
    public ResponseEntity readRecentNotification(@RequestHeader("Authorization") String token)
    {
        ResponseData responseData = notificationService.readRecentNotification(token);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 알림 내역 조회 -> 전체
    @GetMapping("/profile/notification")
    public ResponseEntity readAllNotification(@RequestHeader("Authorization") String token)
    {
        ResponseData responseData = notificationService.readAllNotification(token);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 알림 내역 조회 -> 관심 카테고리
    @GetMapping("/profile/notification/interest")
    public ResponseEntity readInterestNotification(@RequestHeader("Authorization") String token)
    {
        ResponseData responseData = notificationService.readInterestNotification(token);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 알림 내역 조회 -> 신고
    @GetMapping("/profile/notification/report")
    public ResponseEntity readReportNotification(@RequestHeader("Authorization") String token)
    {
        ResponseData responseData =  notificationService.readReportNotification(token);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 알림 전송 -> 관리자 - 신고 처리,  사용자 - 공고 등록  => 완료


}
