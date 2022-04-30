package com.matching.system.control;

import com.matching.system.dto.MemberDTO;
import com.matching.system.dto.PagingDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.filter.ResponseMessage;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MemberControl {
    private final MemberService memberService;
    private final JwtTokenUtil jwtTokenUtil;

    // 회원가입     -> O
    @PostMapping("/signUp")
    public ResponseEntity signUp(@RequestBody MemberDTO.SignUpDTO signUpDTO) {
        ResponseMessage responseMessage = memberService.save(signUpDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 아이디 중복 체크    -> O
    @PostMapping("/signUp/checkId")
    public ResponseEntity checkDuplicateId(@RequestBody MemberDTO.CheckDuplicateId checkDuplicateId) {
        ResponseMessage responseMessage = memberService.checkDuplicateId(checkDuplicateId);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 회원수정     -> O
    @PutMapping("/myAccount/update")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public ResponseEntity updateMember(@RequestHeader("Authorization") String accessToken,
                                       @RequestBody MemberDTO.UpdateAccountDTO updateAccountDTO) {
        ResponseMessage responseMessage = memberService.update(updateAccountDTO, accessToken);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }


    // 회원 탈퇴
    @DeleteMapping("/myAccount/delete/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public ResponseEntity deleteMember(@RequestHeader("Authorization") String accessToken,
                                       @PathVariable("id") Long memberId) {
        ResponseMessage responseMessage = memberService.deleteMember(memberId, accessToken);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 회원 조회 - 한명 (사용자 + 관리자)   -> O        (아무 인증 토큰 갖고 있으면 아무나 드갈 수 있음 -> 수정)
    @GetMapping(value = {"/myAccount/{id}", "/admin/member/detail/{id}"})
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity readMember(@RequestHeader("Authorization") String accessToken,
                                     @PathVariable("id") Long memberId) {
        ResponseData responseData = memberService.readMember(memberId, accessToken);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 회원 전체 조회 - 관리자   -> O
    @GetMapping("/admin/member")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity readMemberList(@ModelAttribute("paging") PagingDTO pagingDTO, Model model) {
        ResponseData responseData = memberService.readMemberList(pagingDTO);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData)
                ;
    }

    // 로그인 -> O
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody MemberDTO.LoginInfo loginInfo) {
//        String jwt = memberService.login(loginInfo);

//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.add(JwtAuthenticationFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        ResponseData responseData = memberService.login(loginInfo);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 로그아웃
    @PostMapping(value = "/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") String accessToken,
                                 @RequestHeader("RefreshToken") String refreshToken) {

        String userId = jwtTokenUtil.getUserId(accessToken.substring(7));

        ResponseMessage responseMessage = memberService.logout(accessToken, userId);

        System.out.println(123);
        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 매칭 프로필 조회 -> 첫화면 ( 이미지, 닉네임, 한줄소개, 매칭 횟수, 기술 평균, 매너 평균  )    -> O
    @GetMapping("/matchingProfile/{id}")
    public ResponseEntity readMatchingProfile(@RequestHeader("Authorization") String accessToken,
                                              @PathVariable(value = "id") Long memberId) {
        ResponseData responseData = memberService.readMatchingProfile(memberId, accessToken);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 사진 등록, ㅅ정        -> O
    @PostMapping("/matchingProfile/updateProfileImg")
    public ResponseEntity updateProfileImg(@RequestBody MemberDTO.UpdateImgAddress createImgAddress) {
        ResponseMessage responseMessage = memberService.updateProfileImg(createImgAddress);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }


    // 한줄 소개 등록, 수정     -> O
    @PostMapping("/matchingProfile/updateProfileContent")
    public ResponseEntity createProfileImg(@RequestBody MemberDTO.UpdateProfileContent createImgAddress) {
        ResponseMessage responseMessage = memberService.updateProfileContent(createImgAddress);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

}
