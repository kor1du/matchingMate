package com.matching.system.service;

import com.matching.system.domain.*;
import com.matching.system.dto.ChattingDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.filter.ResponseMessage;
import com.matching.system.repository.*;
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
public class ChattingService {
    private final ChattingRoomRepository chattingRoomRepository;
    private final ChattingMemberRepository chattingMemberRepository;
    private final ChattingMessageRepository chattingMessageRepository;
    private final MatchingHistoryRepository matchingHistoryRepository;
    private final RatingRepository ratingRepository;

    // 채팅 방 추가
    public void createRoom(MatchingPost matchingPost, Member member)
    {
        // 채팅 방 생성
        ChattingRoom chattingRoom = ChattingRoom.builder()
                .matchingPost(matchingPost)
                .build();

        // 저장
        chattingRoom = chattingRoomRepository.save(chattingRoom);

        // 채팅 회원 추가
        ChattingMember chattingMember = ChattingMember.builder()
                .chattingRoom(chattingRoom)
                .member(member)
                .isReady(true)
                .build();

        chattingMemberRepository.save(chattingMember);
    }

    // 내 채팅 방 목록 조회
    public ResponseData readList(Long memberId)
    {
        // 내 방 조회
        List<ChattingRoom> chattingRoomList = chattingMemberRepository.findAllByMemberId(memberId).stream()
                .map(chattingMember -> chattingMember.getChattingRoom())
                .collect(Collectors.toList());

        // dto
        List<ChattingDTO.ChattingRoomListDTO> chattingRoomListDTOList = chattingRoomList.stream()
                .map(chattingRoom -> ChattingDTO.ChattingRoomListDTO.builder()
                                    .id(chattingRoom.getId())
                                    .matchingPostId(chattingRoom.getMatchingPost().getId())
                                    .matchingPostName(chattingRoom.getMatchingPost().getPostName())
                                    .numberOfPeople(chattingRoom.getMatchingPost().getNumberOfPeople())
                                    .maxNumberOfPeople(chattingRoom.getMatchingPost().getMaxNumberOfPeople())
                                    .roomNumberOfPeople(chattingMemberRepository.countByChattingRoomId(chattingRoom.getId()))
                                    .registerDatetime(chattingRoom.getRegisterDatetime())
                                .build())
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", chattingRoomListDTOList);
    }

    // 채팅방 입장 -> 매칭 상세 조회에서 채팅방 입장
    // -> 준비 상태 여부 추가해야함
    // -> 게시자 memberId + 참여한 사라들 memberId 필요
    public ResponseData inChattingRoom(ChattingDTO.ChattingRoomInOutDTO chattingRoomInOutDTO)
    {
         // chatting_member 추가
        Optional<ChattingRoom> chattingRoom = chattingRoomRepository.findById(chattingRoomInOutDTO.getRoomId());
        if (chattingRoom.isEmpty()) return  new ResponseData(HttpStatus.OK, "검색한 방이 존재하지 않습니다.", null);

        // chattingMember 조회
        List<ChattingDTO.ReadChattingMemberDTO> readMemberDTOList = chattingRoom.get().getChattingMemberList().stream()
                .map(chattingMember -> ChattingDTO.ReadChattingMemberDTO.builder()
                        .chattingMemberId(chattingMember.getId())
                        .memberId(chattingMember.getMember().getId())
                        .nickname(chattingMember.getMember().getNickname())
                        .avgMannerPoint(ratingRepository.findByAvgMannerPoint(chattingRoomInOutDTO.getMemberId()))
                        .avgSkillPoint(ratingRepository.findByAvgMannerPoint(chattingRoomInOutDTO.getMemberId()))
                        .isReady(chattingMember.isReady())
                        .build())
                .collect(Collectors.toList());

        // 채팅 방 메시지 조회 및 반환
        List<ChattingDTO.ReadChattingMessageDTO> readMessageDTOList = chattingRoom.get().getChattingMessageList().stream()
                .map(chattingMessage -> ChattingDTO.ReadChattingMessageDTO.builder()
                        .chattingMessageId(chattingMessage.getId())
                        .memberId(chattingMessage.getChattingMember().getMember().getId())
                        .nickname(chattingMessage.getChattingMember().getMember().getNickname())
                        .message(chattingMessage.getMessage())
                        .registerDatetime(chattingMessage.getRegisterDatetime())
                        .build())
                .collect(Collectors.toList());


        ChattingDTO.ReadChattingMessageAndMemberDTO result = ChattingDTO.ReadChattingMessageAndMemberDTO.builder()
                .id(chattingRoom.get().getId())
                .postMemberId(chattingRoom.get().getMatchingPost().getMember() == null?null:chattingRoom.get().getMatchingPost().getMember().getId())
                .myMemberId(chattingRoomInOutDTO.getMemberId())
                .chattingMemberId(chattingMemberRepository.findByChattingRoomIdAndMemberId(chattingRoomInOutDTO.getRoomId(), chattingRoomInOutDTO.getMemberId()).get().getId())
                .readMemberList(readMemberDTOList)
                .readMessageList(readMessageDTOList)
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다", result);
    }

    // 채팅방 퇴장
    public ResponseMessage outChattingRoom(ChattingDTO.ChattingRoomInOutDTO chattingRoomInOutDTO)
    {
        ChattingRoom chattingRoom = chattingRoomRepository.findById(chattingRoomInOutDTO.getRoomId()).get();

        // chatting_message 삭제
        List<ChattingMessage> chattingMessageList = chattingMessageRepository.findByChattingRoomIdAndChattingMemberId(chattingRoomInOutDTO.getRoomId(), chattingRoomInOutDTO.getMemberId());
        chattingRoom.getChattingMessageList().removeAll(chattingMessageList);

        // chatting_member 삭제
        ChattingMember chattingMember = chattingMemberRepository.findByChattingRoomIdAndMemberId(chattingRoomInOutDTO.getRoomId(), chattingRoomInOutDTO.getMemberId()).get();

        // 이 사람이 ready 상태이면 number_of_people --
        if (chattingMember.isReady() == true) chattingRoom.getMatchingPost().updateMinusNumberOfPeople();

        chattingRoom.getChattingMemberList().remove(chattingMember);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.");
    }

    // 채팅방 내용 전송
    public ResponseMessage sendMessage(ChattingDTO.SendMessageDTO sendMessageDTO)
    {
        Optional<ChattingRoom> findChattingRoom = chattingRoomRepository.findById(sendMessageDTO.getRoomId());
        if (findChattingRoom.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 방이 존재하지 않습니다.");

        Optional<ChattingMember> findChattingMember = chattingMemberRepository.findByChattingRoomIdAndMemberId(sendMessageDTO.getRoomId(), sendMessageDTO.getMemberId());
        if (findChattingMember.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");

        ChattingMessage chattingMessage = ChattingMessage.builder()
                .chattingRoom(findChattingRoom.get())
                .chattingMember(findChattingMember.get())
                .message(sendMessageDTO.getMessage())
                .build();

        chattingMessageRepository.save(chattingMessage);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.");
    }

    // 준비 상태 업데이트   -> 공고 참가자
    // max number of people 되면 -> 준비 완료 상태(공고 게시자)
    public ResponseMessage updateReadyState(ChattingDTO.UpdateReadyState updateReadyState)
    {
        // find
        Optional<ChattingMember> findChattingMember = chattingMemberRepository.findById(updateReadyState.getChattingMemberId());
        if (findChattingMember.isEmpty()) return new ResponseMessage(HttpStatus.CONFLICT, "조회한 회원이 존재하지 않습니다.");

        if (findChattingMember.get().isReady() == updateReadyState.isReady() == true) return new ResponseMessage(HttpStatus.CONFLICT, "이미 준비를 하셨습니다.");

        MatchingPost findMatchingPost = findChattingMember.get().getChattingRoom().getMatchingPost();

        // maxNumberOfPeople 검사
        if (findMatchingPost.getMaxNumberOfPeople() == findMatchingPost.getNumberOfPeople()) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "빈 자리가 없습니다.");

        // chatting member update
        findChattingMember.get().updateReady(updateReadyState.isReady());

        // number of people ++
        if (updateReadyState.isReady() == true) findMatchingPost.updatePlusNumberOfPeople();
        else if (updateReadyState.isReady() == false) findMatchingPost.updateMinusNumberOfPeople();

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.");
    }
    
    // 매칭 완료 -> 공고 게시자
    public ResponseMessage completeMatching(ChattingDTO.CompleteMatching completeMatching)
    {
        Optional<ChattingRoom> findChattingRoom = chattingRoomRepository.findById(completeMatching.getChattingRoomId());
        if (findChattingRoom.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 채팅 방이 존재하지 않습니다.");

        MatchingPost findMatchingPost = findChattingRoom.get().getMatchingPost();

        // maxNumberOfPeople 검사
        if (findMatchingPost.getMaxNumberOfPeople() > findMatchingPost.getNumberOfPeople()) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "아직 매칭 인원이 다 모이지 않았습니다.");

        // 장소나 시간이 미정일 경우
        if (findMatchingPost.getMatchingTime() == null) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "아직 시간이 정해지지 않았습니다.");
        if (findMatchingPost.getDetailPlace() == null) return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "아직 장소가 정해지지 않았습니다.");

        // matching_post -> is_completed 업데이트
        findMatchingPost.updateIsCompleted();

        // matching_history 추가
        MatchingHistory newMatchingHistory = matchingHistoryRepository.save(MatchingHistory.builder()
                .matchingPost(findMatchingPost)
                .build());

        // matching_member 저장
        List<ChattingMember> chattingMemberList = findChattingRoom.get().getChattingMemberList();

        chattingMemberList.stream()
                .filter(chattingMember -> chattingMember.isReady()==true)
                .forEach(chattingMember -> newMatchingHistory.addMatchingMember(
                        MatchingMember.builder()
                                .matchingHistory(newMatchingHistory)
                                .member(chattingMember.getMember())
                                .build()));


        // member - matching_count +1
        newMatchingHistory.getMatchingMemberList().stream()
                .forEach(matchingMember -> matchingMember.getMember().updatePlusMatchingCount());

        return new ResponseMessage(HttpStatus.OK, "매칭을 완료했습니다.");
    }

}
