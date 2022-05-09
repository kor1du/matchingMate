package com.matching.system.service;

import com.matching.system.config.AccessConfig;
import com.matching.system.domain.MatchingHistory;
import com.matching.system.domain.Member;
import com.matching.system.dto.MatchingHistoryDTO;
import com.matching.system.dto.MatchingPostDTO;
import com.matching.system.dto.MemberDTO;
import com.matching.system.response.ResponseData;
import com.matching.system.repository.MatchingHistoryRepository;
import com.matching.system.repository.MatchingMemberRepository;
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
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MatchingHistoryService {
    private final MatchingHistoryRepository matchingHistoryRepository;
    private final MatchingMemberRepository matchingMemberRepository;
    private final RatingRepository ratingRepository;
    private final MemberRepository memberRepository;
    private final AccessConfig accessConfig;


    // 매칭 내역 조회  -> 사용자
    public ResponseData readMatchingHistories(Long memberId, String accessToken)
    {
        Optional<Member> findMember = memberRepository.findById(memberId);

        if (! accessConfig.isNormal(findMember.get().getUserId(), accessToken))
            return new ResponseData(HttpStatus.NOT_ACCEPTABLE, "정상적인 접근이 아닙니다.", null);

        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        // 조회 및 변환
        List<MatchingHistoryDTO> historyDTOList = matchingMemberRepository.findByMatchingMember(findMember.get()).stream()
                .map(matchingMember ->  buildHistoryDTO(matchingMember.getMatchingHistory(), findMember.get()))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", historyDTOList);
    }

    // 매칭 내역 조회 -> 관리자
    public ResponseData readAllMatchingHistories()
    {
        // 조회 및 변환
        List<MatchingHistoryDTO> historyDTOList = matchingHistoryRepository.findAll().stream()
                .map(matchingHistory ->  MatchingHistoryDTO.builder()
                        .id(matchingHistory.getId())
                        .matchedDatetime(matchingHistory.getMatchedDatetime())
                        .matchingPostDTO(buildReadDTO(matchingHistory))
                        .historyMembers(matchingHistory.getMatchingMemberList().stream()
                                .map(matchingMember -> MemberDTO.HistoryMemberDTO.builder()
                                        .id(matchingMember.getMember().getId())
                                        .nickname(matchingMember.getMember().getNickname())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", historyDTOList);
    }

    // 매칭 내역 상세 조회
//    public ResponseData readMatchingHistoryDetail(Long matchingHistoryId)
//    {
//        Optional<MatchingHistory> findMatchingHistory = matchingHistoryRepository.findById(matchingHistoryId);
//
//        if (findMatchingHistory.isEmpty()) throw new IllegalArgumentException("존재하지 않는 기록입니다.");
//
//        MatchingHistoryDTO matchingHistoryDTO = buildHistoryDTO(findMatchingHistory.get());
//
//        // 회원 조회 필요 + nickname, skillPoint, mannerPoint,
//        // 매칭 회원들 정보 조회
//        List<Member> historyMembers = matchingMemberRepository.findByMatchingPostId(matchingHistoryDTO.getMatchingPostDTO().getId()).stream()
//                .map(matchingMember -> matchingMember.getMember())
//                .collect(Collectors.toList());
//
//        // 평점을 이미 줬는지 조회
//
//        // 회원들 정보 및 평점을 조회
//        // MemberDTO.HistoryMember 로 변환
//        List<MemberDTO.HistoryMemberDTO> members = historyMembers.stream()
//                .map(member -> new MemberDTO.HistoryMemberDTO(
//                        member.getId(),
//                        member.getNickname(),
//                        ratingRepository.findByAvgSkillPoint(member.getId()),
//                        ratingRepository.findByAvgMannerPoint(member.getId()),
//                        false))
//                .collect(Collectors.toList());
//
//        matchingHistoryDTO.addHistoryMember(members);
//
//        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", matchingHistoryDTO);
//    }

    private MatchingPostDTO.ReadDTO buildReadDTO(MatchingHistory matchingHistory)
    {
        return MatchingPostDTO.ReadDTO.builder()
                    .id(matchingHistory.getMatchingPost().getId())
                    .memberId( matchingHistory.getMatchingPost().getMember()==null?null:matchingHistory.getMatchingPost().getMember().getId())
                    .nickname(matchingHistory.getMatchingPost().getMember()==null?null:matchingHistory.getMatchingPost().getMember().getNickname())
                    .categoryId(matchingHistory.getMatchingPost().getCategory().getId())
                    .categoryName(matchingHistory.getMatchingPost().getCategory().getName())
                    .categoryImgAddress(matchingHistory.getMatchingPost().getCategory().getImgAddress())
                    .postName(matchingHistory.getMatchingPost().getPostName())
                    .postContents(matchingHistory.getMatchingPost().getPostContents())
                    .matchingDate(matchingHistory.getMatchingPost().getMatchingDate())
                    .matchingTime(matchingHistory.getMatchingPost().getMatchingTime())
                    .recommendedSkill(matchingHistory.getMatchingPost().getRecommendedSkill())
                    .maxNumberOfPeople(matchingHistory.getMatchingPost().getMaxNumberOfPeople())
                    .place(matchingHistory.getMatchingPost().getPlace())
                    .views(matchingHistory.getMatchingPost().getViews())
                    .detailPlace(matchingHistory.getMatchingPost().getDetailPlace())
                    .registerDatetime(matchingHistory.getMatchingPost().getRegisterDatetime())
                .build();
    }

    public MatchingHistoryDTO buildHistoryDTO(MatchingHistory matchingHistory, Member findMember)
    {

        // 매칭 회원 및 평점 여부 조회 ( 자신 제외 )
//        List<MemberDTO.HistoryMemberDTO> historyMembers = matchingMemberRepository.findByMatchingHistoryIdAndMemberIdNot(matchingHistory, findMember).stream()
        List<MemberDTO.HistoryMemberDTO> historyMembers = matchingHistory.getMatchingMemberList().stream()
                .filter(matchingMember -> matchingMember.getMember().getId()!=findMember.getId())
                .map(matchingMember -> MemberDTO.HistoryMemberDTO.builder()
                        .id(matchingMember.getMember().getId())
                        .nickname(matchingMember.getMember().getNickname())
                        .skillPoint(ratingRepository.findByAvgSkillPoint(matchingMember.getMember().getId()))
                        .mannerPoint(ratingRepository.findByAvgMannerPoint(matchingMember.getMember().getId()))
                        .isAlreadyCompleted(
                                ratingRepository.findByMatchingHistoryIdAndMemberIdAndTargetMemberId(matchingHistory, findMember, matchingMember.getMember())
                                        .isEmpty() ? false : true
                        )
                        .build())
                .collect(Collectors.toList());


        MatchingPostDTO.ReadDTO readDTO = buildReadDTO(matchingHistory);

        return MatchingHistoryDTO.builder()
                .id(matchingHistory.getId())
                .matchedDatetime(matchingHistory.getMatchedDatetime())
                .matchingPostDTO(readDTO)
                .historyMembers(historyMembers)
                .build();
    }

}
