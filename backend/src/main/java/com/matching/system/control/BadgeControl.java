package com.matching.system.control;

import com.matching.system.dto.BadgeDTO;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import com.matching.system.service.BadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class BadgeControl {
    private final BadgeService badgeService;

    // 뱃지 추가      -> O
    @PostMapping("/admin/badge/create")
    public ResponseEntity createBadgeStandard(@ModelAttribute BadgeDTO.CreateBadgeStandardDTO createBadgeStandardDTO)
    {
        ResponseMessage responseMessage = badgeService.save(createBadgeStandardDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 뱃지 수정     -> O
    @PutMapping("/admin/badge/update")
    public ResponseEntity updateBadgeStandard(@ModelAttribute BadgeDTO.UpdateBadgeStandardDTO updateBadgeStandardDTO)
    {
        ResponseMessage responseMessage = badgeService.update(updateBadgeStandardDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    @DeleteMapping("/admin/badge/delete/{id}")
    public ResponseEntity deleteBadgeStandard(@PathVariable("id") Long badgeId)
    {
        ResponseMessage responseMessage = badgeService.delete(badgeId);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 뱃지 조회 - 관리자     -> O
    @GetMapping("/admin/badge")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity readAllBadge()
    {
        ResponseData responseData = badgeService.readBadgeList();

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 뱃지  조회 - 사용자     -> O
//    @GetMapping("/matchingProfile/badge")
//    public ResponseEntity readMemberBadge(@RequestHeader("Authorization") String token)
//    {
//        ResponseData responseData = badgeService.readMyBadge(token);
//
//        return ResponseEntity
//                .status(responseData.getStatus())
//                .body(responseData);
//    }

}
