package com.matching.system.service;

import com.matching.system.domain.*;
import com.matching.system.dto.ChattingDTO;
import com.matching.system.dto.MatchingPostDTO;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.process.MapProcess;
import com.matching.system.repository.*;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

//import org.json.JSONArray;
//import org.json.JSONObject;

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
    private final MapProcess mapControl;
    private final JwtTokenUtil jwtTokenUtil;



    // 매칭 공고 추가
    public ResponseMessage save(MatchingPostDTO.CreateDTO matchingPostCreateDTO) {
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
                .isCompleted(0)
                .numberOfPeople(1)
                .views(0)
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
                        .notificationType(NotificationType.관심공고)
                        .message(interestCategory.getCategory().getName() + "의 관심 카테고리 공고가 등록되었습니다.")
                        .url("https://localhost:8080/matchingPost/detail/" + newMatchingPost.getId())
                        .build()

                ))
                .collect(Collectors.toList());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 등록했습니다.");
    }

    // 매칭 공고 수정
    public ResponseMessage update(MatchingPostDTO.UpdateDTO matchingPostUpdateDTO) {
        // 카테고리 검색
        Optional<Category> category = categoryRepository.findById(matchingPostUpdateDTO.getCategoryId());
        if (category.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 카테고리가 존재하지 않습니다.");

        //
        Optional<MatchingPost> findMatchingPost = matchingPostRepository.findById(matchingPostUpdateDTO.getId());
        if (findMatchingPost.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 매칭 공고가 존재하지 않습니다.");

        if (findMatchingPost.get().getNumberOfPeople() > matchingPostUpdateDTO.getMaxNumberOfPeople())
            return new ResponseMessage(HttpStatus.CONFLICT, "현재 인원보다 더 적은 인원은 입력할 수 없습니다.");

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
                        .notificationType(NotificationType.관심공고)
                        .message(category.get().getName() + "의 관심 카테고리 공고가 등록되었습니다.")
                        .url("https://localhost:8080/matchingPost/detail/" + findMatchingPost.get().getId())
                        .build()

                ))
                .collect(Collectors.toList());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정했습니다.");
    }

    // 매칭 공고 삭제
    public ResponseMessage deletePost(Long postId) {
        // chatting room : matching post id 삭제
        Optional<MatchingPost> findMatchingPost = matchingPostRepository.findById(postId);
        if (findMatchingPost.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 매칭 공고가 존재하지 않습니다.");

        matchingPostRepository.deleteById(postId);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 삭제했습니다.");
    }

    // 매칭 공고 조회 -> 사용자 (최신) -> simple 이냐 모두냐
    public ResponseData readRecentPosts(Long categoryId, Double latitude, Double longitude) {
        String address = mapControl.coordToAddr(longitude, latitude);

        System.out.println("address = " + address);

        List<MatchingPost> matchingPostList;

        if (categoryId == null) {
            matchingPostList = matchingPostRepository.findByRecentPosts(address);
        }
        else{
            Category findCategory = categoryRepository.findById(categoryId).get();

            matchingPostList = matchingPostRepository.findByRecentCategoryPosts(findCategory, address);
        }

        List<MatchingPostDTO.ReadSimpleMatchingPostDTO> readDTOList = matchingPostList.stream()
                .map(matchingPost -> PostToSimpleDTO(matchingPost))
                .collect(Collectors.toList());


        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTOList);
    }

    // 매칭 공고 조회 -> 사용자 (최신) -> simple 이냐 모두냐
    public ResponseData readPopularPosts(Long categoryId, Double latitude, Double longitude) {
        String address = mapControl.coordToAddr(longitude, latitude);

        List<MatchingPost> matchingPostList;

        if (categoryId == null) {
            matchingPostList = matchingPostRepository.findByPopularPosts(address);
        } else {
            Category findCategory = categoryRepository.findById(categoryId).get();

            matchingPostList = matchingPostRepository.findByPopularCategoryPosts(findCategory, address);
        }

        List<MatchingPostDTO.ReadSimpleMatchingPostDTO> readDTOList = matchingPostList.stream()
                .map(matchingPost -> PostToSimpleDTO(matchingPost))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTOList);
    }

    private MatchingPostDTO.ReadSimpleMatchingPostDTO PostToSimpleDTO(MatchingPost matchingPost)
    {
        return MatchingPostDTO.ReadSimpleMatchingPostDTO.builder()
                    .id(matchingPost.getId())
                    .categoryName(matchingPost.getCategory().getName())
                    .postName(matchingPost.getPostName())
                    .matchingDate(matchingPost.getMatchingDate())
                    .matchingTime(matchingPost.getMatchingTime())
                    .recommendedSkill(matchingPost.getRecommendedSkill())
                    .numberOfPeople(matchingPost.getNumberOfPeople())
                    .maxNumberOfPeople(matchingPost.getMaxNumberOfPeople())
                    .views(matchingPost.getViews())
                    .place(matchingPost.getPlace())
                    .detailPlace(matchingPost.getDetailPlace())
                    .registerDatetime(matchingPost.getRegisterDatetime())
                .build();
    }

    // admin 매칭 공고 조회
    public ResponseData readAdminPosts() {

        List<MatchingPost> matchingPostList = matchingPostRepository.findAll();

        List<MatchingPostDTO.ReadPostOfAdminDTO> readDTOList = matchingPostList.stream()
                .map(matchingPost -> MatchingPostDTO.ReadPostOfAdminDTO.builder()
                        .id(matchingPost.getId())
                        .categoryName(matchingPost.getCategory().getName())
                        .postName(matchingPost.getPostName())
                        .postContents(matchingPost.getPostContents())
                        .place(matchingPost.getPlace())
                        .detailPlace(matchingPost.getDetailPlace())
                        .registerDatetime(matchingPost.getRegisterDatetime())
                        .build())
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTOList);
    }

    // 매칭 공고 상세 조회
    public ResponseData readPostsDetail(Long postId, String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<MatchingPost> findMatchingPost = matchingPostRepository.findById(postId);

        if (findMatchingPost.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 매칭 공고가 존재하지 않습니다.", null);

        // view ++
        findMatchingPost.get().updateViews();

        MatchingPostDTO.ReadDetailMatchingPostDTO readDTO = MatchingPostDTO.ReadDetailMatchingPostDTO.builder()
                .id(findMatchingPost.get().getId())
                .nickname(findMatchingPost.get().getMember() == null ? null : findMatchingPost.get().getMember().getNickname())
                .categoryName(findMatchingPost.get().getCategory() == null ? null : findMatchingPost.get().getCategory().getName())
                .categoryImgAddress(findMatchingPost.get().getCategory() == null ? null : findMatchingPost.get().getCategory().getImgAddress())
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
                .registerDatetime(findMatchingPost.get().getRegisterDatetime())
                .isMyPost( memberId==findMatchingPost.get().getMember().getId() ? true:false )
                .build();;

        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTO);
    }


    // 채팅방 가입하기
    public ResponseMessage joinChatting(ChattingDTO.ChattingRoomInDTO chattingRoomInDTO, String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        // 이미 가입 여부 확인
        Optional<ChattingMember> validateDuplicateRoom = chattingMemberRepository.findByChattingRoomIdAndMemberId(chattingRoomInDTO.getRoomId(), memberId);
        if (validateDuplicateRoom.isPresent()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 방에 가입되어 있습니다.");

        // chatting_member 추가
        ChattingRoom chattingRoom = chattingRoomRepository.findById(chattingRoomInDTO.getRoomId()).get();

        Member member = memberRepository.findById(memberId).get();

        chattingMemberRepository.save(ChattingMember.builder()
                .chattingRoom(chattingRoom)
                .member(member)
                .isReady(false)
                .build());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.");
    }







}
