package com.matching.system.service;

import com.matching.system.customRepository.MatchingPostCustomRepository;
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

import java.text.SimpleDateFormat;
import java.util.Date;
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
    private final MapProcess mapProcess;
    private final JwtTokenUtil jwtTokenUtil;
    private final MatchingPostCustomRepository matchingPostCustomRepository;

    // 매칭 공고 추가
    public ResponseMessage save(MatchingPostDTO.CreateDTO matchingPostCreateDTO, String token) {

        // 카테고리 검색
        Optional<Category> category = categoryRepository.findById(matchingPostCreateDTO.getCategoryId());
        if (category.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 카테고리가 없습니다.");

        // 회원 검색
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Member member = memberRepository.findById(memberId).get();

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
                .build());

        // 채팅 방 추가 + 채팅 회원 추가
        chattingService.createRoom(newMatchingPost, member);

//        // 관심 카테고리 member 조회 + notification 저장
        sendPostNotification(category.get(), matchingPostCreateDTO.getPlace(), newMatchingPost.getId());
//        interestCategoryRepository.findByInterestCategoryMember(category.get(), newMatchingPost.getPlace()).stream()
//                .map(interestCategory -> notificationRepository.save(Notification.builder()
//                        .member(interestCategory.getMember())
//                        .notificationType(NotificationType.관심공고)
//                        .message(interestCategory.getCategory().getName() + "의 관심 카테고리 공고가 등록되었습니다.")
//                        .url("https://localhost:8080/matchingPost/detail/" + newMatchingPost.getId())
//                        .build()
//
//                ))
//                .collect(Collectors.toList());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 등록했습니다.");
    }

    private void sendPostNotification(Category category, String address, Long matchingPostId) {
        System.out.println("address = " + address);
        // 관심 카테고리 member 조회 + notification 저장
        interestCategoryRepository.findByInterestCategoryMember(category).stream()
                .filter(interestCategory -> address.contains(interestCategory.getMember().getRecentLocation()))
                .forEach(interestCategory -> notificationRepository.save(Notification.builder()
                        .member(interestCategory.getMember())
                        .notificationType(NotificationType.관심공고)
                        .message(interestCategory.getCategory().getName() + "의 관심 카테고리 공고가 등록되었습니다.")
                        .url("https://localhost:8080/matchingPost/detail/" + matchingPostId)
                        .build()

            ));
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

        // new 알림 전송 -> 지역 수정 시
        if (! findMatchingPost.get().getPlace().contains(matchingPostUpdateDTO.getPlace()))
            sendPostNotification(category.get(), matchingPostUpdateDTO.getPlace(), findMatchingPost.get().getId());


        findMatchingPost.get().updateCategory(category.get());
        findMatchingPost.get().updatePostName(matchingPostUpdateDTO.getPostName());
        findMatchingPost.get().updatePostContents(matchingPostUpdateDTO.getPostName());
        findMatchingPost.get().updateMatchingDate(matchingPostUpdateDTO.getMatchingDate());
        findMatchingPost.get().updateMatchingTime(matchingPostUpdateDTO.getMatchingTime());
        findMatchingPost.get().updatePlace(matchingPostUpdateDTO.getPlace());
        findMatchingPost.get().updateMaxNumberOfPeople(matchingPostUpdateDTO.getMaxNumberOfPeople());
        findMatchingPost.get().updateRecommendedSKill(matchingPostUpdateDTO.getRecommendedSkill());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정했습니다.");
    }

    // 매칭 공고 삭제
    public ResponseMessage deletePost(Long postId) {
        // chatting room : matching post id 삭제
        Optional<MatchingPost> findMatchingPost = matchingPostRepository.findById(postId);
        if (findMatchingPost.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 매칭 공고가 존재하지 않습니다.");

        if (findMatchingPost.get().getIsCompleted() == 1) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "이미 매칭이 완료된 매칭 공고 입니다.");

        Optional<ChattingRoom> chattingRoom = chattingRoomRepository.findByMatchingPostId(findMatchingPost.get().getId());
        chattingRoom.get().deleteMatchingPost();

        matchingPostRepository.deleteById(postId);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 삭제했습니다.");
    }

    // 매칭 공고 조회 -> 사용자 (최신) -> simple 이냐 모두냐
    public ResponseData readRecentPosts(MatchingPostDTO.SearchConditionDTO searchCondition) {
        String address = getMemberAddress(searchCondition.getLng(), searchCondition.getLat());

        System.out.println("address = " + address);

        List<MatchingPost> matchingPostList;

        if (searchCondition.getCategoryId() == null) {
            matchingPostList = matchingPostRepository.findByRecentPosts(address);
        }
        else{
            Category findCategory = categoryRepository.findById(searchCondition.getCategoryId()).get();

            matchingPostList = matchingPostRepository.findByRecentCategoryPosts(findCategory, address);
        }

        List<MatchingPostDTO.ReadSimpleMatchingPostDTO> readDTOList = matchingPostList.stream()
                .map(matchingPost -> PostToSimpleDTO(matchingPost))
                .collect(Collectors.toList());


        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTOList);
    }

    // 매칭 공고 조회 -> 인기
    public ResponseData readPopularPosts(MatchingPostDTO.SearchConditionDTO searchCondition) {
        String address = getMemberAddress(searchCondition.getLng(), searchCondition.getLat());

        List<MatchingPost> matchingPostList;

        if (searchCondition.getCategoryId() == null) {
            matchingPostList = matchingPostRepository.findByPopularPosts(address);
        } else {
            Category findCategory = categoryRepository.findById(searchCondition.getCategoryId()).get();

            matchingPostList = matchingPostRepository.findByPopularCategoryPosts(findCategory, address);
        }

        List<MatchingPostDTO.ReadSimpleMatchingPostDTO> readDTOList = matchingPostList.stream()
                .map(matchingPost -> PostToSimpleDTO(matchingPost))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTOList);
    }


    private String getMemberAddress(Double longitude, Double latitude)
    {
        return mapProcess.coordToAddr(longitude, latitude);
    }

    private MatchingPostDTO.ReadSimpleMatchingPostDTO PostToSimpleDTO(MatchingPost matchingPost)
    {
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
        SimpleDateFormat registerFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        return MatchingPostDTO.ReadSimpleMatchingPostDTO.builder()
                    .id(matchingPost.getId())
                    .categoryName(matchingPost.getCategory()==null?null:matchingPost.getCategory().getName())
                    .categoryImgAddress(matchingPost.getCategory()==null?null: matchingPost.getCategory().getImgAddress())
                    .postName(matchingPost.getPostName())
                    .matchingDate(matchingPost.getMatchingDate().toString())
                    .matchingTime( matchingPost.getMatchingTime()==null ? null : timeFormat.format(matchingPost.getMatchingTime()))
                    .recommendedSkill(matchingPost.getRecommendedSkill())
                    .numberOfPeople(matchingPost.getNumberOfPeople())
                    .maxNumberOfPeople(matchingPost.getMaxNumberOfPeople())
                    .inChatNumber( matchingPostCustomRepository.getJoinChatNumber(matchingPost.getId()) )
                    .views(matchingPost.getViews())
                    .place(matchingPost.getPlace())
                    .nickname(matchingPost.getMember()==null ? null : matchingPost.getMember().getNickname())
                    .profileImgAddress(matchingPost.getMember()==null ? null : matchingPost.getMember().getProfileImgAddress())
                    .registerDatetime( matchingPost.getRegisterDatetime()==null ? null : registerFormat.format(matchingPost.getRegisterDatetime()) )
                .build();
    }

    // admin 매칭 공고 조회
    public ResponseData readAdminPosts() {

        List<MatchingPost> matchingPostList = matchingPostRepository.findAll();

        List<MatchingPostDTO.ReadPostOfAdminDTO> readDTOList = matchingPostList.stream()
                .map(matchingPost -> MatchingPostDTO.ReadPostOfAdminDTO.builder()
                        .id(matchingPost.getId())
                        .categoryName(matchingPost.getCategory()==null?null:matchingPost.getCategory().getName())
                        .postName(matchingPost.getPostName())
                        .postContents(matchingPost.getPostContents())
                        .place(matchingPost.getPlace())
                        .registerDatetime(matchingPost.getRegisterDatetime().toString())
                        .build())
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTOList);
    }

    // 매칭 공고 상세 조회
    public ResponseData readPostsDetail(Long postId, String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<MatchingPost> findMatchingPost = matchingPostRepository.findById(postId);

        if (findMatchingPost.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 매칭 공고가 존재하지 않습니다.", null);

        Optional<ChattingRoom> findChattingRoom = chattingRoomRepository.findByMatchingPostId(postId);
        if (findChattingRoom.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 채팅방이 존재하지 않습니다.", null);

//        if (findMatchingPost.get().getMember()==null)
//            System.out.println("member null임 ");

        // view ++
        findMatchingPost.get().updateViews();

        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
        SimpleDateFormat registerFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

//        System.out.println("mapProcess = " + mapProcess.AddrToCoord(findMatchingPost.get().getPlace()));

        Float[] coords = mapProcess.AddrToCoord(findMatchingPost.get().getPlace());

        MatchingPostDTO.ReadDetailMatchingPostDTO readDTO = MatchingPostDTO.ReadDetailMatchingPostDTO.builder()
                .id(findMatchingPost.get().getId())
                .nickname(findMatchingPost.get().getMember() == null ? null : findMatchingPost.get().getMember().getNickname())
                .profileImgAddress(findMatchingPost.get().getMember() == null ? null : findMatchingPost.get().getMember().getProfileImgAddress())
                .categoryName(findMatchingPost.get().getCategory() == null ? null : findMatchingPost.get().getCategory().getName())
                .categoryImgAddress(findMatchingPost.get().getCategory() == null ? null : findMatchingPost.get().getCategory().getImgAddress())
                .postName(findMatchingPost.get().getPostName())
                .postContents(findMatchingPost.get().getPostContents())
                .matchingDate(findMatchingPost.get().getMatchingDate().toString())
                .matchingTime(timeFormat.format(findMatchingPost.get().getMatchingTime()))
                .recommendedSkill(findMatchingPost.get().getRecommendedSkill())
                .maxNumberOfPeople(findMatchingPost.get().getMaxNumberOfPeople())
                .inChatNumber( matchingPostCustomRepository.getJoinChatNumber(findMatchingPost.get().getId()) )
                .views(findMatchingPost.get().getViews())
                .place(findMatchingPost.get().getPlace())
                .registerDatetime(registerFormat.format(findMatchingPost.get().getRegisterDatetime()))
                .chattingRoomId( findChattingRoom.get().getId() )
                .isMyPost( findMatchingPost.get().getMember()==null ?
                            false:
                            (memberId==findMatchingPost.get().getMember().getId() ?
                                    true:
                                    false) )
                .lat(coords[1])
                .lng(coords[0])
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회했습니다.", readDTO);
    }

    // 채팅방 가입하기
    public ResponseMessage joinChatting(ChattingDTO.ChattingRoomInDTO chattingRoomInDTO, String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        // 이미 가입 여부 확인
        Optional<ChattingMember> validateDuplicateRoom = chattingMemberRepository.findByChattingRoomIdAndMemberId(chattingRoomInDTO.getChattingRoomId(), memberId);
        if (validateDuplicateRoom.isPresent()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 방에 가입되어 있습니다.");

//        matchingPostRepository.findById(chattingRoomInDTO.getMatchingPostId());

        // chatting_member 추가
        Optional<ChattingRoom> chattingRoom = chattingRoomRepository.existRoom(chattingRoomInDTO.getChattingRoomId());
        if (chattingRoom.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 채팅 방이 존재하지 않습니다.");

        // 인원수 체크
        Integer inChatNumber = matchingPostCustomRepository.getJoinChatNumber(chattingRoomInDTO.getChattingRoomId());

        if (chattingRoom.get().getMatchingPost().getMaxNumberOfPeople() == inChatNumber) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "현재 최대인원이 가입되어 있습니다.");


        Member member = memberRepository.findById(memberId).get();

        chattingMemberRepository.save(ChattingMember.builder()
                .chattingRoom(chattingRoom.get())
                .member(member)
                .outDatetime(new Date())
                .isReady(false)
                .build());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.");
    }

}
