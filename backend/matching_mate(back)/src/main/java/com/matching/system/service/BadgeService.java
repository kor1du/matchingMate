package com.matching.system.service;

import com.matching.system.domain.Badge;
import com.matching.system.domain.Member;
import com.matching.system.dto.BadgeDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.filter.ResponseMessage;
import com.matching.system.repository.BadgeRepository;
import com.matching.system.repository.MemberRepository;
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
public class BadgeService {
    private final BadgeRepository badgeRepository;
    private final MemberRepository memberRepository;

    // 뱃지 추가 -> 새로운 뱃지 기준을 추가
    public ResponseMessage save(BadgeDTO.BadgeStandardDTO badgeStandardDTO)
    {
//        if (badgeStandardDTO.getName() == null || badgeStandardDTO.getImgAddress() == null)
//            return new ResponseMessage(HttpStatus.BAD_REQUEST, "빈 값이 존재합니다.");

        Optional<Badge> findBadge = badgeRepository.findByImgAddressAndOverMatchingCount(badgeStandardDTO.getImgAddress(), badgeStandardDTO.getOverMatchingCount());

        if (findBadge.isPresent()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 등록된 뱃지가 있습니다.");

        // entity
        Badge newBadge = Badge.builder()
                        .overMatchingCount(badgeStandardDTO.getOverMatchingCount())
                        .imgAddress(badgeStandardDTO.getImgAddress())
                        .build();

        badgeRepository.save(newBadge);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 등록되었습니다.");
    }

    // 뱃지 수정
    public ResponseMessage update(BadgeDTO.BadgeStandardDTO badgeStandardDTO)
    {
        // entity
        Badge badge = badgeRepository.findById(badgeStandardDTO.getId()).get();
        badge.updateBadge(badgeStandardDTO);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정되었습니다.");
    }

    // 뱃지 전체 조회 - 관리자
    public ResponseData readBadgeList()
    {
        List<BadgeDTO.BadgeStandardDTO> badgeStandardList = badgeRepository.findAll().stream()
                .map(badge -> new BadgeDTO.BadgeStandardDTO(badge.getId(), badge.getOverMatchingCount(), badge.getImgAddress()))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", badgeStandardList);
    }

    // 뱃지  조회 - 사용자*****************************************************
    public ResponseData readMyBadge(Long memberId)
    {
        // memberId, matching_count 조회
        Member findMember = memberRepository.findById(memberId).get();

        // 뱃지 리스트
        List<BadgeDTO.BadgeStandardDTO> badgeStandardList = badgeRepository.findAll().stream()
                .map(badge -> new BadgeDTO.BadgeStandardDTO(badge.getId(), badge.getOverMatchingCount(), badge.getImgAddress()))
                .collect(Collectors.toList());

        // 뱃지 비교  -> LAG 함수
        Optional<Badge> badge = badgeRepository.findMyBadge(findMember.getMatchingCount());

        // -> badge가 null이면 아마 젤 높은 overmatchingCount 반환
        if (badge.isEmpty())
            badge = badgeRepository.findHighestBadge();

        BadgeDTO.MemberBadgeDTO memberBadgeDTO = new BadgeDTO.MemberBadgeDTO(
                                                                findMember.getId(),
                                                                findMember.getMatchingCount(),
                                                                badge.get().getImgAddress(),
                                                                badgeStandardList);

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", memberBadgeDTO);
    }

}
