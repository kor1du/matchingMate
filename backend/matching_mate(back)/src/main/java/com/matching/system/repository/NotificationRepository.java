package com.matching.system.repository;

import com.matching.system.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query(value = "SELECT n.* FROM notification n WHERE DATEDIFF(n.register_datetime, CURDATE()) = 0 AND n.target_member_id=:memberId", nativeQuery = true)
    List<Notification> readRecentNotification(@Param("memberId") Long memberId);

    List<Notification> findByMemberId(Long memberId);

    List<Notification> findByMemberIdAndNotificationType(Long memberId, String notificationType);
}
