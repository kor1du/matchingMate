package com.matching.system.customRepository;

import com.matching.system.dto.BadgeDTO;

import java.util.List;
import java.util.Optional;

public interface BadgeCustomRepository {

    Optional<BadgeDTO.MemberBadgeDTO> findMyBadge();

    Optional<BadgeDTO.MemberBadgeDTO> findHighestBadge();

    Optional<BadgeDTO.BadgeStandardDTO> findByImgAddressAndOverMatchingCount(String imgAddress, Integer overMatchingCount);

    Optional<BadgeDTO.BadgeStandardDTO> findById(Long id);

    void updateBadge(BadgeDTO.BadgeStandardDTO badgeStandardDTO);

    List<BadgeDTO.BadgeStandardDTO> findAll();

}
