package com.matching.system.control;

import com.matching.system.dto.BadgeDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.filter.ResponseMessage;
import com.matching.system.service.BadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class BadgeControl {
    private final BadgeService badgeService;

    ///

    // 뱃지 추가      -> O
    @PostMapping("/admin/badge/create")
    public ResponseEntity createBadgeStandard(@RequestBody BadgeDTO.BadgeStandardDTO badgeStandardDTO)
    {
        ResponseMessage responseMessage = badgeService.save(badgeStandardDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 뱃지 수정     -> O
    @PutMapping("/admin/badge/update")
    public ResponseEntity updateBadgeStandard(@RequestBody BadgeDTO.BadgeStandardDTO badgeStandardDTO)
    {
        ResponseMessage responseMessage = badgeService.update(badgeStandardDTO);

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
    @GetMapping("/matchingProfile/badge/{id}")
    public ResponseEntity readMemberBadge(@PathVariable("id") Long memberId)
    {
        ResponseData responseData = badgeService.readMyBadge(memberId);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

}
