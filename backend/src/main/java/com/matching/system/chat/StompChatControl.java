package com.matching.system.chat;

import com.matching.system.dto.ChattingDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompChatControl {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping(value = "/chat/enter")
    public void enter(ChattingDTO.SendMessageDTO sendMessageDTO)
    {
        simpMessagingTemplate.convertAndSend("/sub/chat/room" + sendMessageDTO.getChattingMemberId(), sendMessageDTO.getChattingMemberId() + " 님 입장하셨슴돠~");
    }

    @MessageMapping(value = "/chat/message")
    public void message(ChattingDTO.SendMessageDTO message){
        simpMessagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}
