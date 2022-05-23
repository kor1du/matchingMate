package com.matching.system.control;

import com.matching.system.dto.RatingDTO;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import com.matching.system.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class RatingControl {
    private final RatingService ratingService;

    // 평점 추가    -> O
    @PostMapping("/matchingProfile/history/detail/rating")
    public ResponseEntity createRating(@RequestBody RatingDTO.CreateRatingDTO createRatingDTO,
                                       @RequestHeader("Authorization") String token) {
        ResponseMessage responseMessage = ratingService.createRating(createRatingDTO, token);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 평점 삭제    -> O
    @DeleteMapping("/admin/rating/delete/{id}")
    public ResponseEntity deleteRating(@PathVariable(value = "id") Long ratingId) {
        ResponseMessage responseMessage = ratingService.deleteRating(ratingId);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 평점 조회 - 사용자    -> O
    @GetMapping("/profile/rating")
    public ResponseEntity readMemberRating(@RequestHeader("Authorization") String token) {
        ResponseData responseData = ratingService.readMemberRating(token);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 평점 조회 - 관리자    -> O
    @GetMapping("/admin/rating")
    public ResponseEntity readAdminRating() {
        ResponseData responseData = ratingService.readAdminRating();

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

}
