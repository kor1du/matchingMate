package com.matching.system.service;

import com.matching.system.domain.Member;
import com.matching.system.domain.Notification;
import com.matching.system.domain.NotificationType;
import com.matching.system.dto.NotificationDTO;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.repository.MemberRepository;
import com.matching.system.repository.NotificationRepository;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenUtil jwtTokenUtil;

    // 알림 조회
    public ResponseData readRecentNotification(String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        List<Notification> notificationList = notificationRepository.readRecentNotification(memberId);

        Integer noReadCount = notificationList.stream()
                .filter(notification -> notification.getReadDatetime()==null)
                .collect(Collectors.toList())
                .size();

        List<NotificationDTO.TodayNotificationDTO> notificationDTOList = notificationList.stream()
                .map(notification -> NotificationDTO.TodayNotificationDTO.builder()
                        .id(notification.getId())
                        .notificationType(notification.getNotificationType().name())
                        .message(notification.getMessage())
                        .registerDatetime(new SimpleDateFormat("a h:mm").format(notification.getRegisterDatetime()))
                        .build())
                .sorted(Comparator.comparing(NotificationDTO.TodayNotificationDTO::getRegisterDatetime))
                .collect(Collectors.toList());

        NotificationDTO.ReadTodayNotificationDTO readTodayNotificationDTO = NotificationDTO.ReadTodayNotificationDTO.builder()
                .todayNotificationDTOList(notificationDTOList)
                .noReadCount(noReadCount)
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", readTodayNotificationDTO);
    }

    // 알림 아이콘 누르는 순간
    public ResponseMessage updateReadNotification(String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");

        List<Notification> notificationList = notificationRepository.readNoReadNotification(findMember.get());

        notificationList.stream()
                .forEach(Notification::updateReadDatetime);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.") ;
    }

    // 알림 내역 조회 -> 전체
    public ResponseData readAllNotification(String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        SimpleDateFormat registerFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        List<NotificationDTO.ReadNotificationDTO> notificationDTOList = notificationRepository.findByMemberId(findMember.get()).stream()
                .map(notification -> changeEntityToDTO(notification))
                .sorted(Comparator.comparing(NotificationDTO.ReadNotificationDTO::getRegisterDatetime))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", notificationDTOList);
    }

    // 알림 내역 조회 -> 카테고리
    public ResponseData readInterestNotification(String token)
    {
        System.out.println("관심");
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        List<NotificationDTO.ReadNotificationDTO> notificationDTOList = notificationRepository.findByMemberIdAndNotificationType(findMember.get(), NotificationType.관심공고).stream()
                .map(notification -> changeEntityToDTO(notification))
                .sorted(Comparator.comparing(NotificationDTO.ReadNotificationDTO::getRegisterDatetime))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK,"정상적으로 조회되었습니다.", notificationDTOList);
    }

    
    // 알림 내역 조회 -> 신고
    public ResponseData readReportNotification(String token)
    {
        System.out.println("신고");
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        List<NotificationDTO.ReadNotificationDTO> notificationDTOList = notificationRepository.findByMemberIdAndNotificationType(findMember.get(), NotificationType.신고처리).stream()
                .map(notification -> changeEntityToDTO(notification))
                .sorted(Comparator.comparing(NotificationDTO.ReadNotificationDTO::getRegisterDatetime))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", notificationDTOList);
    }

    private NotificationDTO.ReadNotificationDTO changeEntityToDTO(Notification notification)
    {
        SimpleDateFormat registerFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        return NotificationDTO.ReadNotificationDTO.builder()
                .id(notification.getId())
                .notificationType(notification.getNotificationType().toString())
                .message(notification.getMessage())
                .url(notification.getUrl())
                .registerDatetime(registerFormat.format(notification.getRegisterDatetime()))
                .build();
    }

    // 알림 전송 (신고) -> reportService
    // 알림 전송 (관심 카테고리) -> matchingPost

}
