package com.matching.system.control;

import com.matching.system.response.ResponseData;
import com.matching.system.service.MatchingHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class MatchingHistoryControl {
    private final MatchingHistoryService matchingHistoryService;

    // 매칭 내역 추가 -> 매칭 공고 완료에 포함

    // 매칭 내역 조회 -> 사용자      -> O
    @GetMapping("/matchingProfile/history/{id}")
    public ResponseEntity readMatchingHistories(@RequestHeader("Authorization") String accessToken,
                                                @PathVariable(value = "id") Long memberId)
    {
        ResponseData responseData = matchingHistoryService.readMatchingHistories(memberId, accessToken);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }
    
    // 매칭 내역 조회 -> 관리자      -> O
    @GetMapping("/admin/matchingHistory")
    public ResponseEntity readAllMatchingHistories()
    {
        ResponseData responseData = matchingHistoryService.readAllMatchingHistories();

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 매칭 내역 상세 조회      -> 매칭 내역 조회에 정보 다 넣음
//    @GetMapping(value = {"/matchingProfile/history/detail/{id}", "/admin/matchingHistory/detail/{id}"})
//    public ResponseEntity readMatchingHistoryDetail(@PathVariable(value = "id") Long matchingHistoryId)
//    {
//        ResponseData responseData = matchingHistoryService.readMatchingHistoryDetail(matchingHistoryId);
//
//        return ResponseEntity
//                .status(responseData.getStatus())
//                .body(responseData);
//
//    }


}
