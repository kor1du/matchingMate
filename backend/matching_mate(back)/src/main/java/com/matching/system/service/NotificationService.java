package com.matching.system.service;

import com.matching.system.domain.Member;
import com.matching.system.dto.NotificationDTO;
import com.matching.system.dto.response.ResponseData;
import com.matching.system.repository.MemberRepository;
import com.matching.system.repository.NotificationRepository;
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
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;

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
        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        List<NotificationDTO> notificationDTOList = notificationRepository.findByMemberId(findMember.get()).stream()
                .map(notification -> new NotificationDTO(notification.getId(), notification.getMember().getId(), notification.getNotificationType(),
                        notification.getMessage(), notification.getUrl(), notification.getRegisterDateTIme()))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", notificationDTOList);
    }

    // 알림 내역 조회 -> 카테고리
    public ResponseData readInterestNotification(Long memberId)
    {
        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        List<NotificationDTO> notificationDTOList = notificationRepository.findByMemberIdAndNotificationType(findMember.get(), "관심 카테고리 알림").stream()
                .map(notification -> new NotificationDTO(notification.getId(), notification.getMember().getId(), notification.getNotificationType(),
                        notification.getMessage(), notification.getUrl(), notification.getRegisterDateTIme()))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK,"정상적으로 조회되었습니다.", notificationDTOList);
    }
    
    // 알림 내역 조회 -> 신고
    public ResponseData readReportNotification(Long memberId)
    {
        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        List<NotificationDTO> notificationDTOList = notificationRepository.findByMemberIdAndNotificationType(findMember.get(), "신고 처리 알림").stream()
                .map(notification -> new NotificationDTO(notification.getId(), notification.getMember().getId(), notification.getNotificationType(),
                        notification.getMessage(), notification.getUrl(), notification.getRegisterDateTIme()))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", notificationDTOList);
    }

    // 알림 전송 (신고) -> reportService
    // 알림 전송 (관심 카테고리) -> matchingPost

}
