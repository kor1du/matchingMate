package com.matching.system.service;

import com.matching.system.customRepository.MatchingPostCustomRepository;
import com.matching.system.domain.*;
import com.matching.system.dto.ChattingDTO;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.repository.*;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ChattingService {
    private final ChattingRoomRepository chattingRoomRepository;
    private final ChattingMemberRepository chattingMemberRepository;
    private final ChattingMessageRepository chattingMessageRepository;
    private final MatchingHistoryRepository matchingHistoryRepository;
    private final RatingRepository ratingRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final MatchingPostCustomRepository matchingPostCustomRepository;

    // 채팅 방 추가
    public void createRoom(MatchingPost matchingPost, Member member)
    {
        // 채팅 방 생성
        Set<ChattingMember> chattingMember = new HashSet<>();

        ChattingRoom chattingRoom = ChattingRoom.builder()
                .matchingPost(matchingPost)
                .chattingMemberList(chattingMember)
                .modifiedDatetime(new Date())
                .build();

        // 채팅 회원 추가
        chattingRoom.addChattingMember(ChattingMember.builder()
                .chattingRoom(chattingRoom)
                .member(member)
                .isReady(true)
                .build());

        chattingRoom = chattingRoomRepository.save(chattingRoom);
    }

    // 내 채팅 방 목록 조회
    public ResponseData readList(String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        SimpleDateFormat registerFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Optional<Member> findMember = memberRepository.findById(memberId);

        // 내 방 조회
        List<ChattingRoom> chattingRoomList = chattingMemberRepository.findAllByMemberId(findMember.get()).stream()
                .map(chattingMember -> chattingMember.getChattingRoom())
                .collect(Collectors.toList());

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        // dto
        List<ChattingDTO.ChattingRoomListDTO> chattingRoomListDTOList = chattingRoomList.stream()
                .map(chattingRoom -> ChattingDTO.ChattingRoomListDTO.builder()
                                    .id(chattingRoom.getId())
                                    .matchingPostId( chattingRoom.getMatchingPost()==null?null:chattingRoom.getMatchingPost().getId())
                                    .matchingPostName( chattingRoom.getMatchingPost()==null?null:chattingRoom.getMatchingPost().getPostName())
                                    .numberOfPeople( chattingRoom.getMatchingPost()==null?null:chattingRoom.getMatchingPost().getNumberOfPeople())
                                    .maxNumberOfPeople( chattingRoom.getMatchingPost()==null?null:chattingRoom.getMatchingPost().getMaxNumberOfPeople())
                                    .roomNumberOfPeople( chattingRoom.getChattingMemberList().size())
                                    .registerDatetime(registerFormat.format(chattingRoom.getRegisterDatetime()))
                                    .isCompleted(chattingRoom.getMatchingPost()==null?null:chattingRoom.getMatchingPost().getIsCompleted())
                                    .noReadChatCount(
                                            chattingRoom.getChattingMessageList().stream()
                                                    .filter(chattingMessage -> chattingMessage.getRegisterDatetime().compareTo(
                                                            chattingRoom.getChattingMemberList().stream()
                                                                    .filter(chattingMember -> chattingMember.getChattingRoom().getId().equals(chattingRoom.getId()) && chattingMember.getMember().getId().equals(memberId)==true)
                                                                    .collect(Collectors.toList()).stream().findFirst().get().getOutDatetime()
                                                    ) == 1 )
                                                    .collect(Collectors.toList())
                                                    .size()
                                    )
                                .modifiedDatetime(dateFormat.format(chattingRoom.getModifiedDatetime()))
                            .build())
                .sorted(Comparator.comparing(ChattingDTO.ChattingRoomListDTO::getModifiedDatetime).reversed())
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", chattingRoomListDTOList);
    }

    public ResponseData inChattingRoomId(Long roomId, String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));
//        Long memberId = chattingRoomInOutDTO.getMemberId();

        System.out.println("memberId = " + memberId + ", " + roomId);
        Optional<ChattingRoom> chattingRoom = chattingRoomRepository.existRoom(roomId);
        if (chattingRoom.isEmpty()) return  new ResponseData(HttpStatus.OK, "검색한 방이 존재하지 않습니다.", null);

        // 나, 방장 먼저 넣기..
        ChattingMember myChattingMember = chattingMemberRepository.findByChattingRoomIdAndMemberId(roomId, memberId).get();

        Long myChattingMemberId = myChattingMember.getId();

        Comparator<ChattingDTO.ReadChattingMemberDTO> compare = Comparator
                .comparing(ChattingDTO.ReadChattingMemberDTO::getPriority).reversed()
                .thenComparing(ChattingDTO.ReadChattingMemberDTO::getMemberId);

        // chattingMember 조회
        List<ChattingDTO.ReadChattingMemberDTO> readMemberDTOList = chattingRoom.get().getChattingMemberList().stream()
                .map(chattingMember -> ChattingDTO.ReadChattingMemberDTO.builder()
                        .chattingMemberId(chattingMember.getId())
                        .memberId(chattingMember.getMember().getId())
                        .profileImgAddress(chattingMember.getMember().getProfileImgAddress())
                        .nickname(chattingMember.getMember().getNickname())
                        .avgMannerPoint(ratingRepository.findByAvgMannerPoint(memberId))
                        .avgSkillPoint(ratingRepository.findByAvgMannerPoint(memberId))
                        .isReady(chattingMember.isReady())
                        .priority(
                                (myChattingMemberId.equals(chattingMember.getId()) ? 2 : (
                                        chattingRoom.get().getMatchingPost().getMember()==null ? 0 : (
                                                chattingRoom.get().getMatchingPost().getMember().getId().equals(chattingMember.getMember().getId()) ?
                                                    1 :
                                                    0
                                        )))
                        )
                        .build())
                .sorted(compare)
                .collect(Collectors.toList());

        SimpleDateFormat registerFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        // 채팅 방 메시지 조회 및 반환
        List<ChattingDTO.ReadChattingMessageDTO> readMessageDTOList = chattingRoom.get().getChattingMessageList().stream()
                .map(chattingMessage -> ChattingDTO.ReadChattingMessageDTO.builder()
                            .chattingMessageId(chattingMessage.getId())
                            .memberId(chattingMessage.getChattingMember() == null ? null : chattingMessage.getChattingMember().getMember().getId())
                            .profileImgAddress(chattingMessage.getChattingMember() == null ? null : chattingMessage.getChattingMember().getMember().getProfileImgAddress())
                            .nickname(chattingMessage.getChattingMember() == null ? null : chattingMessage.getChattingMember().getMember().getNickname())
                            .message(chattingMessage.getMessage())
                            .registerDatetime(registerFormat.format(chattingMessage.getRegisterDatetime()))
                        .build())
                .sorted(Comparator.comparing(ChattingDTO.ReadChattingMessageDTO::getChattingMessageId))
                .collect(Collectors.toList());

        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


        ChattingDTO.ReadChattingMessageAndMemberDTO result = ChattingDTO.ReadChattingMessageAndMemberDTO.builder()
                .id(chattingRoom.get().getId())
                .postMemberId((chattingRoom.get().getMatchingPost()==null || chattingRoom.get().getMatchingPost().getMember() == null?null:chattingRoom.get().getMatchingPost().getMember().getId()))
                .place(chattingRoom.get().getMatchingPost() == null?null:chattingRoom.get().getMatchingPost().getPlace())
                .matchingDate(chattingRoom.get().getMatchingPost()==null || chattingRoom.get().getMatchingPost().getMatchingDate() == null?null:dateFormat.format(chattingRoom.get().getMatchingPost().getMatchingDate()))
                .matchingTime(chattingRoom.get().getMatchingPost()==null || chattingRoom.get().getMatchingPost().getMatchingTime() == null?null:timeFormat.format(chattingRoom.get().getMatchingPost().getMatchingTime()))
                .numberOfPeople( chattingRoom.get().getMatchingPost() == null?null:chattingRoom.get().getMatchingPost().getNumberOfPeople() )
                .maxNumberOfPeople( chattingRoom.get().getMatchingPost() == null?null:chattingRoom.get().getMatchingPost().getMaxNumberOfPeople() )
                .myMemberId(memberId)
                .chattingMemberId(chattingMemberRepository.findByChattingRoomIdAndMemberId(roomId, memberId).get().getId())
                .isCompleted( chattingRoom.get().getMatchingPost()==null ? null : chattingRoom.get().getMatchingPost().getIsCompleted() )
                .readMemberList(readMemberDTOList)
                .readMessageList(readMessageDTOList)
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다", result);
    }

    // 퇴장
    public ResponseMessage outChattingRoom(Long  chattingMemberId, String token)
    {
        ChattingMember findChattingMember = chattingMemberRepository.findById(chattingMemberId).get();

//        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = new Date();

            findChattingMember.updateOutDatetime(date);
//        } catch (ParseException e)
//        {
//            e.printStackTrace();
//        }

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었씁니다.");
    }

    // 채팅방 삭제
    public ResponseMessage deleteChattingRoom(Long chattingMemberId)
    {
        ChattingMember findChattingMember = chattingMemberRepository.findById(chattingMemberId).get();

        findChattingMember.getChattingMessageList().clear();
        findChattingMember.getChattingRoom().getChattingMemberList().remove(findChattingMember);


        // 이 사람이 ready 상태이면 number_of_people --
        if (findChattingMember.getChattingRoom().getMatchingPost().getIsCompleted()==0 && findChattingMember.isReady() == true) findChattingMember.getChattingRoom().getMatchingPost().updateMinusNumberOfPeople();

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.");
    }

    // 채팅방 내용 전송
    public ChattingDTO.ReadChattingMessageDTO sendMessage(ChattingDTO.SendMessageDTO sendMessageDTO, Long memberId)
    {
        Optional<ChattingMember> findChattingMember = chattingMemberRepository.findByChattingRoomIdAndMemberId(sendMessageDTO.getRoomId(), memberId);

//        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = new Date();

            System.out.println("simpleDateFormat.parse(date.toString()) = " + simpleDateFormat.format(date));
            findChattingMember.get().getChattingRoom().updateModifiedDatetime( date );
//        } catch (ParseException e)
//        {
//            e.printStackTrace();
//        }



        ChattingMessage chattingMessage = ChattingMessage.builder()
                .chattingRoom(findChattingMember.get().getChattingRoom())
                .chattingMember(findChattingMember.get())
                .message(sendMessageDTO.getMessage())
                .build();

        ChattingMessage newChattingMessage = chattingMessageRepository.save(chattingMessage);

        SimpleDateFormat registerFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        return ChattingDTO.ReadChattingMessageDTO.builder()
                .chattingMessageId(newChattingMessage.getId())
                .memberId(memberId)
                .nickname(findChattingMember.get().getMember().getNickname())
                .profileImgAddress(findChattingMember.get().getMember().getProfileImgAddress())
                .message(sendMessageDTO.getMessage())
                .registerDatetime(registerFormat.format(newChattingMessage.getRegisterDatetime()))
                .build();

    }

    // 준비 상태 업데이트   -> 공고 참가자
    // max number of people 되면 -> 준비 완료 상태(공고 게시자)
    public ResponseMessage updateReadyState(ChattingDTO.UpdateReadyState updateReadyState)
    {
        // find
        Optional<ChattingMember> findChattingMember = chattingMemberRepository.findById(updateReadyState.getChattingMemberId());
        if (findChattingMember.isEmpty()) return new ResponseMessage(HttpStatus.CONFLICT, "조회한 회원이 존재하지 않습니다.");

        if (findChattingMember.get().isReady() == updateReadyState.getReady()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 준비를 하셨습니다.");

        MatchingPost findMatchingPost = findChattingMember.get().getChattingRoom().getMatchingPost();
        if (findMatchingPost==null) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "해당 공고를 찾을 수 없습니다.");

        // maxNumberOfPeople 검사
        if (updateReadyState.getReady() && findMatchingPost.getMaxNumberOfPeople() == findMatchingPost.getNumberOfPeople()) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "빈 자리가 없습니다.");

        // chatting member update
        findChattingMember.get().updateReady(updateReadyState.getReady());

        // number of people ++
        if (updateReadyState.getReady()) findMatchingPost.updatePlusNumberOfPeople();
        else if (! updateReadyState.getReady()) findMatchingPost.updateMinusNumberOfPeople();

        String message;

        message = "[" + findChattingMember.get().getMember().getNickname() + "] 님이 " + ( updateReadyState.getReady()==true? "매칭에 참여했습니다." : "매칭을 취소했습니다.");

        // chatting Message 저장
        ChattingMessage chattingMessage = ChattingMessage.builder()
                    .message(message)
                    .registerDatetime(new Date())
                    .chattingMember(null)
                    .chattingRoom(findChattingMember.get().getChattingRoom())
                .build();

        chattingMessageRepository.save(chattingMessage);

        return new ResponseMessage(HttpStatus.OK, message);
    }

    // 매칭 완료 -> 공고 게시자
    public ResponseMessage completeMatching(ChattingDTO.CompleteMatching completeMatching)  {
        Optional<ChattingRoom> findChattingRoom = chattingRoomRepository.existRoom(completeMatching.getChattingRoomId());
        if (findChattingRoom.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 채팅 방이 존재하지 않습니다.");


        MatchingPost findMatchingPost = findChattingRoom.get().getMatchingPost();
        if (findMatchingPost==null) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "해당 공고를 찾을 수 없습니다.");

        // maxNumberOfPeople 검사
        if (findMatchingPost.getMaxNumberOfPeople() > findMatchingPost.getNumberOfPeople()) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "아직 매칭 인원이 다 모이지 않았습니다.");

        // 장소나 시간이 미정일 경우
        if (findMatchingPost.getMatchingTime() == null) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "아직 시간이 정해지지 않았습니다.");

        // matching_post -> is_completed, detail place, matchingTime 업데이트
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");

        findMatchingPost.updateIsCompleted();
        findMatchingPost.updatePlace(completeMatching.getPlace());
        findMatchingPost.updateMatchingTime(completeMatching.getMatchingTime());

        // matching_history 추가
        List<MatchingMember> matchingMemberList = new ArrayList<>();

        MatchingHistory newMatchingHistory = MatchingHistory.builder()
                .matchingPost(findMatchingPost)
                .matchingMemberList(matchingMemberList)
                .build();

        // matching_member 저장
        Set<ChattingMember> chattingMemberList = findChattingRoom.get().getChattingMemberList();

        chattingMemberList.stream()
                .filter(chattingMember -> chattingMember.isReady()==true)
                .forEach(chattingMember -> newMatchingHistory.addMatchingMember(
                        MatchingMember.builder()
                                .matchingHistory(newMatchingHistory)
                                .member(chattingMember.getMember())
                                .build()));

        matchingHistoryRepository.save(newMatchingHistory);

        // member - matching_count +1
        newMatchingHistory.getMatchingMemberList().stream()
                .forEach(matchingMember -> matchingMember.getMember().updatePlusMatchingCount());


        // chatting 저장
        SimpleDateFormat matchingDateFormat = new SimpleDateFormat("yyyy년 MM월 dd일");
        SimpleDateFormat matchingTimeFormat = new SimpleDateFormat("a HH시 mm분");


        String message = "매칭시간 : " + matchingDateFormat.format(findMatchingPost.getMatchingDate())  + " " + matchingTimeFormat.format(completeMatching.getMatchingTime());

        chattingMessageRepository.save(ChattingMessage.builder()
                .chattingMember(null)
                .chattingRoom(findChattingRoom.get())
                .message(message)
                .registerDatetime(new Date())
                .build());

        message = "매칭장소 : " + completeMatching.getPlace();

        chattingMessageRepository.save(ChattingMessage.builder()
                .chattingMember(null)
                .chattingRoom(findChattingRoom.get())
                .message(message)
                .registerDatetime(new Date())
                .build());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.");
    }

    public String sendTime(ChattingDTO.CompleteMatching completeMatching) {
        SimpleDateFormat matchingDateFormat = new SimpleDateFormat("yyyy년 MM월 dd일");
        SimpleDateFormat matchingTimeFormat = new SimpleDateFormat("a HH시 mm분");

        String matchingTime =  "매칭시간 : " + matchingTimeFormat.format(matchingPostCustomRepository.getMatchingDate(completeMatching.getChattingRoomId())) + " " + completeMatching.getMatchingTime();

        return matchingTime;
    }

}
