package com.matching.system.control;

import com.matching.system.dto.InterestCategoryDTO;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import com.matching.system.service.InterestCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class InterestCategoryControl {
    private final InterestCategoryService interestCategoryService;

    // 관심 카테고리 추가   -> O
    @PostMapping("/profile/interestCategory/create")
    public ResponseEntity create(@RequestBody InterestCategoryDTO.CreateDTO interestCategoryDTO,
                                 @RequestHeader("Authorization") String token) {
        ResponseData responseData = interestCategoryService.save(interestCategoryDTO, token);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 관심 카테고리 수정   -> O
    @PutMapping("/profile/interestCategory/update")
    public ResponseEntity update(@RequestBody InterestCategoryDTO.UpdateDTO interestCategoryDTO,
                                 @RequestHeader("Authorization") String token) {
        ResponseMessage responseMessage = interestCategoryService.update(interestCategoryDTO, token);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 관심 카테고리 삭제   -> O
    @DeleteMapping("/profile/interestCategory/delete/{id}")
    public ResponseEntity delete(@PathVariable(name = "id") Long interestCategoryId) {
        ResponseMessage responseMessage = interestCategoryService.delete(interestCategoryId);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 관심 카테고리 조회   -> O
    @GetMapping("/profile/interestCategory")
    public ResponseEntity read(@RequestHeader("Authorization") String token) {
        ResponseData responseData =  interestCategoryService.read(token);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 관심 카테고리 조회   -> O
    @GetMapping("/myInterest")
    public ResponseEntity readMyInterest(@RequestHeader("Authorization") String token) {
        ResponseData responseData =  interestCategoryService.readMyInterest(token);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

}
