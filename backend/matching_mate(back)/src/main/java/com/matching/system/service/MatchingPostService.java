package com.matching.system.service;

import com.matching.system.domain.*;
import com.matching.system.dto.ChattingDTO;
import com.matching.system.dto.MatchingPostDTO;
import com.matching.system.dto.PagingDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.filter.ResponseMessage;
import com.matching.system.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MatchingPostService {
    private final MatchingPostRepository matchingPostRepository;
    private final CategoryRepository categoryRepository;
    private final InterestCategoryRepository interestCategoryRepository;
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;
    private final ChattingService chattingService;
    private final ChattingMemberRepository chattingMemberRepository;
    private final ChattingRoomRepository chattingRoomRepository;

    // 매칭 공고 추가
    public ResponseMessage save(MatchingPostDTO.CreateDTO matchingPostCreateDTO)
    {
        // 카테고리 검색
        Optional<Category> category = categoryRepository.findById(matchingPostCreateDTO.getCategoryId());
        if (category.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 카테고리가 없습니다.");

        // 회원 검색
        Member member = memberRepository.findById(matchingPostCreateDTO.getMemberId()).get();

        // 저장
        MatchingPost newMatchingPost = matchingPostRepository.save(MatchingPost.builder()
                                .member(member)
                                .category(category.get())
                                .postName(matchingPostCreateDTO.getPostName())
                                .postContents(matchingPostCreateDTO.getPostContents())
                                .matchingDate(matchingPostCreateDTO.getMatchingDate())
                                .matchingTime(matchingPostCreateDTO.getMatchingTime())
                                .recommendedSkill(matchingPostCreateDTO.getRecommendedSkill())
                                .numberOfPeople(1)
                                .maxNumberOfPeople(matchingPostCreateDTO.getMaxNumberOfPeople())
                                .place(matchingPostCreateDTO.getPlace())
                                .detailPlace(matchingPostCreateDTO.getDetailPlace())
                                .build());

        // 채팅 방 추가 + 채팅 회원 추가
        chattingService.createRoom(newMatchingPost, member);

        // 관심 카테고리 member 조회 + notification 저장
        interestCategoryRepository.findByInterestCategoryMember(category.get(), newMatchingPost.getPlace()).stream()
                .map(interestCategory -> notificationRepository.save(Notification.builder()
                                .member(interestCategory.getMember())
                                .notificationType("관심 카테고리 알림")
                                .message(category.get().getName() + "의 관심 카테고리 공고가 등록되었습니다.")
                                .url("https://localhost:8080/matchingPost/detail/" + newMatchingPost.getId())
                                .build()

                ))
                .collect(Collectors.toList());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 등록했습니다.");
    }

    // 매칭 공고 수정
    public ResponseMessage update(MatchingPostDTO.UpdateDTO matchingPostUpdateDTO)
    {
        // 카테고리 검색
        Optional<Category> category = categoryRepository.findById(matchingPostUpdateDTO.getCategoryId());
        if (category.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 카테고리가 존재하지 않습니다.");

        //
        Optional<MatchingPost> findMatchingPost = matchingPostRepository.findById(matchingPostUpdateDTO.getId());
        if (findMatchingPost.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 매칭 공고가 존재하지 않습니다.");

        if (findMatchingPost.get().getNumberOfPeople() > matchingPostUpdateDTO.getMaxNumberOfPeople()) return new ResponseMessage(HttpStatus.CONFLICT, "현재 인원보다 더 적은 인원은 입력할 수 없습니다.");

        findMatchingPost.get().updateCategory(category.get());
        findMatchingPost.get().updatePostName(matchingPostUpdateDTO.getPostName());
        findMatchingPost.get().updatePostContents(matchingPostUpdateDTO.getPostName());
        findMatchingPost.get().updateMatchingDate(matchingPostUpdateDTO.getMatchingDate());
        findMatchingPost.get().updateMatchingTime(matchingPostUpdateDTO.getMatchingTime());
        findMatchingPost.get().updatePlace(matchingPostUpdateDTO.getPlace());
        findMatchingPost.get().updateDetailPlace(matchingPostUpdateDTO.getDetailPlace());
        findMatchingPost.get().updateMaxNumberOfPeople(matchingPostUpdateDTO.getMaxNumberOfPeople());
        findMatchingPost.get().updateRecommendedSKill(matchingPostUpdateDTO.getRecommendedSkill());

        // 알림 전송 -> 지역 수정 시 (기존 알림은 제거)
        interestCategoryRepository.findByInterestCategoryMember(category.get(), findMatchingPost.get().getPlace()).stream()
                .map(interestCategory -> notificationRepository.save(Notification.builder()
                        .member(interestCategory.getMember())
                        .notificationType("관심 카테고리 알림")
                        .message(category.get().getName() + "의 관심 카테고리 공고가 등록되었습니다.")
                        .url("https://localhost:8080/matchingPost/detail/" + findMatchingPost.get().getId())
                        .build()

                ))
                .collect(Collectors.toList());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정했습니다.");
    }

    // 매칭 공고 삭제
    public ResponseMessage deletePost(Long postId)
    {
        matchingPostRepository.deleteById(postId);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 삭제했습니다.");
    }

    // 매칭 공고 조회 -> 사용자 (최신) -> simple 이냐 모두냐
    public ResponseData readRecentPosts()
    {
//        Pageable pageable = PageRequest.of(paging.getFirstPage(), paging.getPageCount());

        List<MatchingPost> matchingPostList = matchingPostRepository.findByRecentPosts();

        List<MatchingPostDTO.ReadDTO> readDTOList = matchingPostList.stream()
                .map(matchingPost -> changeEntityToDTO(matchingPost))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTOList);
    }

    // 매칭 공고 조회 -> 사용자 (최신) -> simple 이냐 모두냐
    public ResponseData readPopularPosts(PagingDTO paging)
    {
        Pageable pageable = PageRequest.of(paging.getFirstPage(), paging.getPageCount());

        List<MatchingPost> matchingPostList = matchingPostRepository.findByPopularPosts(pageable);

        List<MatchingPostDTO.ReadDTO> readDTOList = matchingPostList.stream()
                .map(matchingPost -> changeEntityToDTO(matchingPost))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTOList);
    }

    // admin 매칭 공고 조회
    public ResponseData readAdminPosts()
    {
        List<MatchingPost> matchingPostList = matchingPostRepository.findByRecentPosts();

        List<MatchingPostDTO.ReadDTO> readDTOList = matchingPostList.stream()
                    .map(matchingPost -> changeEntityToDTO(matchingPost))
                    .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTOList);
    }

    // 매칭 공고 상세 조회
    public ResponseData readPostsDetail(Long postId)
    {
        Optional<MatchingPost> findMatchingPost = matchingPostRepository.findById(postId);

        if (findMatchingPost.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 매칭 공고가 존재하지 않습니다.", null);

        // view ++
        findMatchingPost.get().updateViews();

        MatchingPostDTO.ReadDTO readDTO = MatchingPostDTO.ReadDTO.builder()
                .id(findMatchingPost.get().getId())
                .memberId(findMatchingPost.get().getMember() == null?null:findMatchingPost.get().getMember().getId())
                .nickname(findMatchingPost.get().getMember().getNickname())
                .categoryId(findMatchingPost.get().getCategory().getId())
                .categoryImgAddress(findMatchingPost.get().getCategory().getImgAddress())
                .categoryName(findMatchingPost.get().getCategory().getName())
                .postName(findMatchingPost.get().getPostName())
                .postContents(findMatchingPost.get().getPostContents())
                .matchingDate(findMatchingPost.get().getMatchingDate())
                .matchingTime(findMatchingPost.get().getMatchingTime())
                .recommendedSkill(findMatchingPost.get().getRecommendedSkill())
                .numberOfPeople(findMatchingPost.get().getNumberOfPeople())
                .maxNumberOfPeople(findMatchingPost.get().getMaxNumberOfPeople())
                .views(findMatchingPost.get().getViews())
                .place(findMatchingPost.get().getPlace())
                .detailPlace(findMatchingPost.get().getDetailPlace())
                .isCompleted(findMatchingPost.get().getIsCompleted())
                .registerDatetime(findMatchingPost.get().getRegisterDatetime())
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTO);
    }

    public MatchingPostDTO.ReadDTO changeEntityToDTO(MatchingPost matchingPost)
    {
        return MatchingPostDTO.ReadDTO.builder()
                .id(matchingPost.getId())
                .memberId(matchingPost.getMember() == null?null:matchingPost.getMember().getId())
                .nickname(matchingPost.getMember() == null?null:matchingPost.getMember().getNickname())
                .categoryId(matchingPost.getCategory() == null?null:matchingPost.getCategory().getId())
                .categoryName(matchingPost.getCategory() == null?null:matchingPost.getCategory().getName())
                .categoryImgAddress(matchingPost.getCategory() == null?null:matchingPost.getCategory().getImgAddress())
                .postName(matchingPost.getPostName())
                .postContents(matchingPost.getPostContents())
                .matchingDate(matchingPost.getMatchingDate())
                .matchingTime(matchingPost.getMatchingTime())
                .recommendedSkill(matchingPost.getRecommendedSkill())
                .numberOfPeople(matchingPost.getNumberOfPeople())
                .maxNumberOfPeople(matchingPost.getMaxNumberOfPeople())
                .views(matchingPost.getViews())
                .place(matchingPost.getPlace())
                .detailPlace(matchingPost.getDetailPlace())
                .isCompleted(matchingPost.getIsCompleted())
                .registerDatetime(matchingPost.getRegisterDatetime())
                .build();
    }

    // 채팅방 가입하기
    public ResponseMessage joinChatting(ChattingDTO.ChattingRoomInOutDTO chattingRoomInOutDTO)
    {

        // 이미 가입 여부 확인
        Optional<ChattingMember> validateDuplicateRoom = chattingMemberRepository.findByChattingRoomIdAndMemberId(chattingRoomInOutDTO.getRoomId(), chattingRoomInOutDTO.getMemberId());
        if (validateDuplicateRoom.isPresent()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 방에 가입되어 있습니다.");

        // chatting_member 추가
        ChattingRoom chattingRoom = chattingRoomRepository.findById(chattingRoomInOutDTO.getRoomId()).get();

        Member member = memberRepository.findById(chattingRoomInOutDTO.getMemberId()).get();

        chattingMemberRepository.save(ChattingMember.builder()
                .chattingRoom(chattingRoom)
                .member(member)
                .isReady(false)
                .build());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.");
    }


}
