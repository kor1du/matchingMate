package com.matching.system.service;

import com.matching.system.dto.NotificationDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    // 알림 조회
    public ResponseData readRecentNotification(Long memberId)
    {
        List<NotificationDTO> notificationDTOList = notificationRepository.readRecentNotification(memberId).stream()
                .map(notification -> new NotificationDTO(notification.getId(), notification.getMember().getId(), notification.getNotificationType(),
                        notification.getMessage(), notification.getUrl(), notification.getRegisterDateTIme()))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", notificationDTOList);
    }

    // 알림 내역 조회 -> 전체
    public ResponseData readAllNotification(Long memberId)
    {
        List<NotificationDTO> notificationDTOList = notificationRepository.findByMemberId(memberId).stream()
                .map(notification -> new NotificationDTO(notification.getId(), notification.getMember().getId(), notification.getNotificationType(),
                        notification.getMessage(), notification.getUrl(), notification.getRegisterDateTIme()))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", notificationDTOList);
    }

    // 알림 내역 조회 -> 카테고리
    public ResponseData readInterestNotification(Long memberId)
    {
        List<NotificationDTO> notificationDTOList = notificationRepository.findByMemberIdAndNotificationType(memberId, "관심 카테고리 알림").stream()
                .map(notification -> new NotificationDTO(notification.getId(), notification.getMember().getId(), notification.getNotificationType(),
                        notification.getMessage(), notification.getUrl(), notification.getRegisterDateTIme()))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK,"정상적으로 조회되었습니다.", notificationDTOList);
    }
    
    // 알림 내역 조회 -> 신고
    public ResponseData readReportNotification(Long memberId)
    {
        List<NotificationDTO> notificationDTOList = notificationRepository.findByMemberIdAndNotificationType(memberId, "신고 처리 알림").stream()
                .map(notification -> new NotificationDTO(notification.getId(), notification.getMember().getId(), notification.getNotificationType(),
                        notification.getMessage(), notification.getUrl(), notification.getRegisterDateTIme()))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", notificationDTOList);
    }

    // 알림 전송 (신고) -> reportService
    // 알림 전송 (관심 카테고리) -> matchingPost

}
