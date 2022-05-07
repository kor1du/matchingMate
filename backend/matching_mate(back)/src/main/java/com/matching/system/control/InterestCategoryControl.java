package com.matching.system.control;

import com.matching.system.dto.InterestCategoryDTO;
import com.matching.system.dto.response.ResponseData;
import com.matching.system.dto.response.ResponseMessage;
import com.matching.system.service.InterestCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/matchingProfile")
public class InterestCategoryControl {
    private final InterestCategoryService interestCategoryService;

    // 관심 카테고리 추가   -> O
    @PostMapping("/interestCategory/create")
    public ResponseEntity create(@RequestBody InterestCategoryDTO.CreateDTO interestCategoryDTO) {
        ResponseMessage responseMessage = interestCategoryService.save(interestCategoryDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 관심 카테고리 수정   -> O
    @PutMapping("/interestCategory/update")
    public ResponseEntity update(@RequestBody InterestCategoryDTO.UpdateDTO interestCategoryDTO) {
        ResponseMessage responseMessage = interestCategoryService.update(interestCategoryDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 관심 카테고리 삭제   -> O
    @DeleteMapping("/interestCategory/delete/{id}")
    public ResponseEntity delete(@PathVariable(name = "id") Long interestCategoryId) {
        ResponseMessage responseMessage = interestCategoryService.delete(interestCategoryId);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 관심 카테고리 조회   -> O
    @GetMapping("/interestCategory/{id}")
    public ResponseEntity read(@RequestHeader("Authorization") String accessToken,
                                @PathVariable(name = "id") Long memberId) {
        ResponseData responseData =  interestCategoryService.read(memberId, accessToken);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

}
