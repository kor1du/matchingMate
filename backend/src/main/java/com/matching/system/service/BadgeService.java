package com.matching.system.service;

import com.matching.system.domain.Badge;
import com.matching.system.domain.Member;
import com.matching.system.dto.BadgeDTO;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.process.ImageProcess;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
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
    private final JwtTokenUtil jwtTokenUtil;
    private final ImageProcess imageProcess;

    // 뱃지 추가 -> 새로운 뱃지 기준을 추가
    public ResponseMessage save(BadgeDTO.CreateBadgeStandardDTO createBadgeDTO)
    {
//        if (badgeStandardDTO.getName() == null || badgeStandardDTO.getImgAddress() == null)
//            return new ResponseMessage(HttpStatus.BAD_REQUEST, "빈 값이 존재합니다.");

        Optional<Badge> findBadge = badgeRepository.findByOverMatchingCount(createBadgeDTO.getOverMatchingCount());

        if (findBadge.isPresent()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 등록된 뱃지가 있습니다.");

        // 사진 저장
        String imageUrl = imageProcess.getImageUrl(createBadgeDTO.getOverMatchingCount().toString(), createBadgeDTO.getBadgeImgFile());

        // entity
        Badge newBadge = Badge.builder()
                        .overMatchingCount(createBadgeDTO.getOverMatchingCount())
                        .imgAddress(imageUrl)
                        .build();

        badgeRepository.save(newBadge);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 등록되었습니다.");
    }

    // 뱃지 수정
    public ResponseMessage update(BadgeDTO.UpdateBadgeStandardDTO updateBadgeStandardDTO)
    {
        // entity
        Badge badge = badgeRepository.findById(updateBadgeStandardDTO.getBadgeId()).get();

        // 사진 저장
        String imageUrl = imageProcess.getImageUrl(updateBadgeStandardDTO.getOverMatchingCount().toString(), updateBadgeStandardDTO.getBadgeImgFile());

        badge.updateOverMatchingCount(updateBadgeStandardDTO.getOverMatchingCount());
        badge.updateImgAddress(imageUrl);

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
    public BadgeDTO.MemberBadgeDTO readMyBadge(String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        // memberId, matching_count 조회
        Member findMember = memberRepository.findById(memberId).get();

        // 뱃지 비교  -> LAG 함수
        Optional<Badge> badge = badgeRepository.findMyBadge(findMember.getMatchingCount());

        // -> badge가 null이면 아마 젤 높은 overmatchingCount 반환
        if (badge.isEmpty())
            badge = badgeRepository.findHighestBadge();

        return new BadgeDTO.MemberBadgeDTO(badge.get().getImgAddress());

//        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", memberBadgeDTO);
    }
    // 뱃지 삭제
    public ResponseMessage delete(Long badgeId)
    {
        // 삭제
        badgeRepository.deleteById(badgeId);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 삭제되었습니다.");
    }
}
