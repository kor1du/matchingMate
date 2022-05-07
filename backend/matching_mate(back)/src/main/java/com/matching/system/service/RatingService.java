package com.matching.system.service;

import com.matching.system.domain.MatchingHistory;
import com.matching.system.domain.Member;
import com.matching.system.domain.Rating;
import com.matching.system.dto.RatingDTO;
import com.matching.system.dto.response.ResponseData;
import com.matching.system.dto.response.ResponseMessage;
import com.matching.system.repository.MatchingHistoryRepository;
import com.matching.system.repository.MemberRepository;
import com.matching.system.repository.RatingRepository;
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
public class RatingService {

    private final RatingRepository ratingRepository;
    private final MemberRepository memberRepository;
    private final MatchingHistoryRepository matchingHistoryRepository;

    // 평점 추가
    public ResponseMessage createRating(RatingDTO.CreateRatingDTO createRatingDTO)
    {
        // 중복 체크
        Optional<MatchingHistory> findMatchingHistory = matchingHistoryRepository.findById(createRatingDTO.getMatchingHistoryId());
        Optional<Member> member = memberRepository.findById(createRatingDTO.getMemberId());
        Optional<Member> targetMember = memberRepository.findById(createRatingDTO.getTargetMemberId());

        Optional<Rating> findRating = ratingRepository.findByMatchingHistoryIdAndMemberIdAndTargetMemberId(findMatchingHistory.get(), member.get(), targetMember.get());
        if (findRating.isPresent()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 평점을 등록하셨습니다.");

        if (member.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "회원이 존재하지 않습니다.");
        if (targetMember.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "회원이 존재하지 않습니다.");
        if (findMatchingHistory.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "매칭 내역이 존재하지 않습니다.");

        // entity
        Rating rating = Rating.builder()
                .contents(createRatingDTO.getContents())
                .matchingHistory(findMatchingHistory.get())
                .member(member.get())
                .targetMember(targetMember.get())
                .skillPoint(createRatingDTO.getSkillPoint())
                .mannerPoint(createRatingDTO.getMannerPoint())
                .build();

        ratingRepository.save(rating);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 등록되었습니다.");
    }

    // 평점 삭제
    public ResponseMessage deleteRating(Long ratingId)
    {
        ratingRepository.deleteById(ratingId);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 삭제되었습니다.");
    }

    // 평점 조회 - 사용자 (자기꺼 - targetMemberId)
    public ResponseData readMemberRating(Long targetMemberId)
    {
        Optional<Member> findMember = memberRepository.findById(targetMemberId);
        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        // 기술, 매너 평균
        Float avgSkillPoint = ratingRepository.findByAvgSkillPoint(targetMemberId);
        Float avgMannerPoint = ratingRepository.findByAvgMannerPoint(targetMemberId);

        // 개별적으로 Rating.
        List<RatingDTO.ReadDetailRatingDTO> readDetailRatingDTOS = ratingRepository.findByTargetMemberId(findMember.get()).stream()
                .map(rating -> RatingDTO.ReadDetailRatingDTO.builder()
                        .id(rating.getId())
                        .targetMemberNickname(rating.getTargetMember()==null?null:rating.getTargetMember().getNickname())
                        .memberNickname(rating.getMember()==null?null:rating.getMember().getNickname())
                        .contents(rating.getContents())
                        .skillPoint(rating.getSkillPoint())
                        .mannerPoint(rating.getMannerPoint())
                        .registerDatetime(rating.getRegisterDatetime())
                        .build())
                .collect(Collectors.toList());

        RatingDTO.ReadRatingDTO readRatingDTO = new RatingDTO.ReadRatingDTO(avgSkillPoint, avgMannerPoint, readDetailRatingDTOS);

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", readRatingDTO);
    }

    // 평점 조회 - 관리자 (모든 리스트)
    public ResponseData readAdminRating()
    {
        List<Rating> ratingList = ratingRepository.findAll();

        List<RatingDTO.ReadDetailRatingDTO> readDetailRatingDTOList = ratingList.stream()
                .map(rating -> RatingDTO.ReadDetailRatingDTO.builder()
                        .id(rating.getId())
                        .targetMemberNickname(rating.getTargetMember()==null?null:rating.getTargetMember().getNickname())
                        .memberNickname(rating.getMember()==null?null:rating.getMember().getNickname())
                        .contents(rating.getContents())
                        .skillPoint(rating.getSkillPoint())
                        .mannerPoint(rating.getMannerPoint())
                        .registerDatetime(rating.getRegisterDatetime())
                        .build())
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", readDetailRatingDTOList);
    }

}
