package com.matching.system.control;

import com.matching.system.dto.ChattingDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.filter.ResponseMessage;
import com.matching.system.service.ChattingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChattingControl {
    private final ChattingService chattingService;

    // 채팅 방 추가 -> 매칭 공고에서 공고 추가

    // 채팅 방 목록 조회      -> O     (제일 최신에 채팅메시지 전송된걸 젤 위로 -> 수정)
    @GetMapping("/{id}")
    public ResponseEntity readList(@PathVariable(value = "id") Long memberId) {
        ResponseData responseData = chattingService.readList(memberId);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 채팅방 입장 및 메시지 반환      -> O
    @GetMapping("/in")
    public ResponseEntity inChattingRoom(@ModelAttribute("chatting") ChattingDTO.ChattingRoomInOutDTO chattingRoomInOutDTO, Model model) {
       ResponseData responseData = chattingService.inChattingRoom(chattingRoomInOutDTO);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 채팅방 퇴장       -> O
    @PostMapping("/out")
    public ResponseEntity outChattingRoom(@RequestBody ChattingDTO.ChattingRoomInOutDTO chattingRoomInOutDTO) {
        ResponseMessage responseMessage = chattingService.outChattingRoom(chattingRoomInOutDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 채팅방 내용 전송       -> O
    @PostMapping("/in")
    public ResponseEntity sendMessage(@RequestBody ChattingDTO.SendMessageDTO sendMessageDTO) {
        ResponseMessage responseMessage = chattingService.sendMessage(sendMessageDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 채팅방 매칭 ready -> 개별 (공고 참가자)       -> O
    @PutMapping("/in")
    public ResponseEntity updateReadyState(@RequestBody ChattingDTO.UpdateReadyState updateReadyState) {
        ResponseMessage responseMessage = chattingService.updateReadyState(updateReadyState);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 전체 준비 완료 = 매칭 완료 (공고 게시자)        -> O
    // ready 할때마다 10/10 이런 상태 확인 필요
    @PostMapping("/in/complete")
    public ResponseEntity completeMatching(@RequestBody ChattingDTO.CompleteMatching completeMatching) {
        ResponseMessage responseMessage = chattingService.completeMatching(completeMatching);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

}
