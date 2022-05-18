package com.matching.system.chat;

import com.matching.system.dto.ChattingDTO;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.service.ChattingService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class StompChatControl {
    private final ChattingService chattingService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final JwtTokenUtil jwtTokenUtil;

    // 입장
    @MessageMapping(value = "/chat/enter")
    public void enter(@RequestBody ChattingDTO.SendMessageDTO sendMessageDTO) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(sendMessageDTO.getToken()));

        simpMessagingTemplate.convertAndSend("/sub/chat/in" + sendMessageDTO.getRoomId(), memberId + " 님 입장하셨슴돠~");
    }

    // 전송
    @MessageMapping(value = "/chat/message")
    public void message(@RequestBody ChattingDTO.SendMessageDTO sendMessageDTO) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(sendMessageDTO.getToken()));

        ChattingDTO.ReadChattingMessageDTO responseMessageDTO = chattingService.sendMessage(sendMessageDTO, memberId);

        simpMessagingTemplate.convertAndSend("/sub/chat/in/" + sendMessageDTO.getRoomId(), responseMessageDTO);
    }
}
