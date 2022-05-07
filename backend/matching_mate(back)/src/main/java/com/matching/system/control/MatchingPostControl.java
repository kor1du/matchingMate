package com.matching.system.control;

import com.matching.system.dto.ChattingDTO;
import com.matching.system.dto.MatchingPostDTO;
import com.matching.system.dto.response.ResponseData;
import com.matching.system.dto.response.ResponseMessage;
import com.matching.system.service.MatchingPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class MatchingPostControl {
    private final MatchingPostService matchingPostService;

    // 매칭 공고 추가     -> O
    // 관심카테고리부터 테스트
    @PostMapping("/matchingPost/create")
    public ResponseEntity save(@RequestBody MatchingPostDTO.CreateDTO matchingPostCreateDTO) {
        ResponseMessage responseMessage = matchingPostService.save(matchingPostCreateDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 매칭 공고 수정       -> O
    @PutMapping("/matchingPost/detail/update")
    public ResponseEntity update(@RequestBody MatchingPostDTO.UpdateDTO matchingPostUpdateDTO) {
        ResponseMessage responseMessage = matchingPostService.update(matchingPostUpdateDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }


    // 매칭 공고 삭제       -> O
    @DeleteMapping(value = {"/matchingPost/detail/delete/{id}", "/admin/matchingPost/delete/{id}"})
    public ResponseEntity deletePost(@PathVariable(value = "id") Long postId)
    {
        ResponseMessage responseMessage = matchingPostService.deletePost(postId);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);

    }

    // 매칭 공고 조회 -> 사용자 (첫 페이지) -> 최신 우선       -> O
    @GetMapping(value = "/recent")
    public ResponseEntity readRecentPosts(@RequestParam(value = "category", required = false) Long categoryId,
                                          @RequestParam(value = "lat") Double latitude,
                                          @RequestParam(value = "lng") Double longitude) {

        ResponseData responseData = matchingPostService.readRecentPosts(categoryId, latitude, longitude);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 인기 공고 조회       -> O
    @GetMapping(value = "/popular")
    public ResponseEntity readPopularPosts(@RequestParam(value = "category", required = false) Long categoryId,
                                           @RequestParam(value = "lat") Double latitude,
                                           @RequestParam(value = "lng") Double longitude) {
        ResponseData responseData = matchingPostService.readPopularPosts(categoryId, latitude, longitude);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }


    // 매칭 공고 조회 -> 관리자       -> O
    @GetMapping(value = "/admin/matchingPost")
    public ResponseEntity readAdminPosts() {
        ResponseData responseData = matchingPostService.readAdminPosts();

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 매칭 공고 상세 조회 + 조회 수       -> O
    @GetMapping(value = {"/matchingPost/detail/{id}", "/admin/matchingPost/detail/{id}"})
    public ResponseEntity readPostsDetail(@PathVariable(value = "id") Long postId) {
        ResponseData responseData = matchingPostService.readPostsDetail(postId);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 매칭 공고 채팅방 들어가기       -> O
    @PostMapping(value = "/matchingPost/detail/joinChat")
    public ResponseEntity joinChatting(@RequestBody ChattingDTO.ChattingRoomInDTO chattingRoomInDTO)
    {
        ResponseMessage responseMessage = matchingPostService.joinChatting(chattingRoomInDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

}
