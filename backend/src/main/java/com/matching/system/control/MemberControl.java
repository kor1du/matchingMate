package com.matching.system.control;

import com.matching.system.dto.MemberDTO;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public ResponseEntity updateMember(@RequestHeader("Authorization") String token,
                                       @RequestBody MemberDTO.UpdateAccountDTO updateAccountDTO) {
        ResponseMessage responseMessage = memberService.update(updateAccountDTO, token);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }


    // 회원 탈퇴
    @DeleteMapping("/myAccount/delete")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public ResponseEntity deleteMember(@RequestHeader("Authorization") String token) {
        ResponseMessage responseMessage = memberService.deleteMember(token);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 회원 조회 - 한명 (사용자 + 관리자)   -> O        (아무 인증 토큰 갖고 있으면 아무나 드갈 수 있음 -> 수정)
    @GetMapping(value = {"/admin/member/detail/{id}"})
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity readMemberOfAdmin(@PathVariable("id") Long memberId) {
        ResponseData responseData = memberService.readMemberOfAdmin(memberId);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    @GetMapping(value = {"/myAccount"})
    public ResponseEntity readMemberOfUser(@RequestHeader("Authorization") String token) {
        ResponseData responseData = memberService.readMemberOfUser(token);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 회원 전체 조회 - 관리자   -> O
    @GetMapping("/admin/member")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity readMemberList() {
        ResponseData responseData = memberService.readMemberList();

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

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 매칭 프로필 조회 -> 첫화면 ( 이미지, 닉네임, 한줄소개, 매칭 횟수, 기술 평균, 매너 평균  )    -> O
    @GetMapping("/profile")
    public ResponseEntity readMatchingProfile(@RequestHeader("Authorization") String token) {
        ResponseData responseData = memberService.readMatchingProfile(token);

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

    // 사진 등록, ㅅ정        -> O
    @PostMapping("/matchingProfile/updateProfileImg")
    public ResponseEntity updateProfileImg(@ModelAttribute MemberDTO.UpdateImgAddress updateImgAddress,
                                           @RequestHeader("Authorization") String token) {
        ResponseMessage responseMessage = memberService.updateProfileImg(updateImgAddress, token);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }


    // 한줄 소개 등록, 수정     -> O
    @PostMapping("/matchingProfile/updateProfileContent")
    public ResponseEntity createProfileImg(@RequestBody MemberDTO.UpdateProfileContent createImgAddress,
                                           @RequestHeader("Authorization") String token) {
        ResponseMessage responseMessage = memberService.updateProfileContent(createImgAddress, token);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

}
