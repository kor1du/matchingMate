package com.matching.system.service;

import com.matching.system.domain.*;
import com.matching.system.dto.MemberDTO;
import com.matching.system.jwt.JwtExpirationEnums;
import com.matching.system.jwt.TokenDTO;
import com.matching.system.jwt.redis.*;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.process.ImageProcess;
import com.matching.system.repository.*;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final RatingRepository ratingRepository;
    private final ChattingRoomRepository chattingRoomRepository;
    private final MemberRepository memberRepository;
    private final MatchingPostRepository matchingPostRepository;
    private final ReportRepository reportRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final ImageProcess imageProcess;
    private final BadgeService badgeService;

    // 회원가입
    public ResponseMessage save(MemberDTO.SignUpDTO signUpDTO)
    {
        // 중복 확인
        Optional<Member> findMember = memberRepository.findByUserId(signUpDTO.getUserId());
        if (findMember.isPresent()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 가입되어 있는 유저입니다.");

        // 암호화
        signUpDTO.setUserPw(passwordEncoder.encode(signUpDTO.getUserPw()));
        
        // entity 변환
        Member member = Member.builder()
                .name(signUpDTO.getName())
                .userId(signUpDTO.getUserId())
                .userPw(signUpDTO.getUserPw())
                .nickname(signUpDTO.getNickname())
                .address(signUpDTO.getAddress())
                .sex( (signUpDTO.getSex().equals("남자")?1:2))
                .birthday(signUpDTO.getBirthday())
                .phone(signUpDTO.getPhone())
                .profileImgAddress("https://i.ibb.co/F8N7yP9/image.png")
                .build();

        // 권한
        MemberAuthority memberAuthority = new MemberAuthority();
        memberAuthority.setAuthority(RoleType.ROLE_USER);
        memberAuthority.setMember(member);

        member.grantAuthority(memberAuthority);

        // 저장 및 DTO 반환
        memberRepository.save(member);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 가입되었습니다.");
    }

    // 아이디 중복 체크
    public ResponseMessage checkDuplicateId(MemberDTO.CheckDuplicateId checkDuplicateId)
    {
        Optional<Member> findMember = memberRepository.findByUserId(checkDuplicateId.getUserId());

        if (findMember.isEmpty())
            return new ResponseMessage(HttpStatus.OK, "가입 가능한 아이디입니다.");

        return new ResponseMessage(HttpStatus.CONFLICT, "아이디가 이미 존재합니다.");

    }

    public ResponseMessage checkDuplicateNickname(MemberDTO.CheckDuplicateNickname checkDuplicateNickname)
    {
        Optional<Member> findMember = memberRepository.findByNickname(checkDuplicateNickname.getNickname());

        if (findMember.isEmpty())
            return new ResponseMessage(HttpStatus.OK, "가입 가능한 아이디입니다.");

        return new ResponseMessage(HttpStatus.CONFLICT, "아이디가 이미 존재합니다.");

    }

    // 회원수정
    public ResponseMessage update(MemberDTO.UpdateAccountDTO updateAccountDTO, String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);

        if (findMember.isEmpty())
            return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다..");

        // update
        findMember.get().updateUserPw(passwordEncoder.encode(updateAccountDTO.getUserPw()));
        findMember.get().updateName(updateAccountDTO.getName());
        findMember.get().updateNickname(updateAccountDTO.getNickname());
        findMember.get().updatePhone(updateAccountDTO.getPhone());
        findMember.get().updateAddress(updateAccountDTO.getAddress());
        findMember.get().updateBirthday(updateAccountDTO.getBirthday());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 변경되었습니다.");
   }


    // 회원 탈퇴

    // matching post -> memberId = null
    // report -> targetMemberId, memberId = null
    // rating -> targetMemberId, memberId = null
    public ResponseMessage deleteMember(String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember  = memberRepository.findById(memberId);

        if (findMember.isEmpty())
            return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");

        // report - member
//        reportRepository.findByMemberId(memberId)
//                .forEach(Report::deleteMember);

        // report -targetMember
        reportRepository.deleteByTargetMemberId(memberId);
        reportRepository.deleteByMemberId(memberId);


        // rating - member
        ratingRepository.findByMemberId(memberId)
                .forEach(Rating::deleteMember);

        // report - targetMember
        ratingRepository.deleteByTargetMemberId(memberId);

        // matching
        // is_completed == 1이면 null 넣고
        // is_completed == 0이면 공고 삭제
        List<MatchingPost> matchingPostList = matchingPostRepository.findByMemberId(memberId);
        for (MatchingPost matchingPost : matchingPostList)
        {
            if (matchingPost.getIsCompleted()==1)
                matchingPost.deleteMember();
            else {
                chattingRoomRepository.findByMatchingPostId(matchingPost.getId())
                        .forEach(ChattingRoom::deleteMatchingPost);
                matchingPostRepository.deleteById(matchingPost.getId());
            }
        }

        // 관심 카테고리, 알림, matching member, chatting member
        memberRepository.deleteById(memberId);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 삭제되었습니다.");
    }

    // 회원 조회 - 한명
    public ResponseData readMemberOfAdmin(Long memberId)
    {
        Optional<Member> findMember  = memberRepository.findById(memberId);

        if (memberId == null) return new ResponseData(HttpStatus.NOT_FOUND, "탈퇴한 회원입니다.", null);


        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        MemberDTO.ReadMemberInfoDTO findMemberDTO = MemberDTO.ReadMemberInfoDTO.builder()
                .id(findMember.get().getId())
                .userId(findMember.get().getUserId())
                .userPw(findMember.get().getUserPw())
                .birthday(new SimpleDateFormat("yyyy-mm-dd").format(findMember.get().getBirthday()))
                .sex( (findMember.get().getSex() == 1?"남자":"여자") )
                .name(findMember.get().getName())
                .nickname(findMember.get().getNickname())
                .phone(findMember.get().getPhone())
                .address(findMember.get().getAddress())
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회를 완료했습니다.", findMemberDTO);
    }

    public ResponseData readMemberOfUser(String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember  = memberRepository.findById(memberId);

        if (memberId == null) return new ResponseData(HttpStatus.NOT_FOUND, "탈퇴한 회원입니다.", null);


        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        MemberDTO.ReadMyInfoDTO findMemberDTO = MemberDTO.ReadMyInfoDTO.builder()
                .userId(findMember.get().getUserId())
                .userPw(findMember.get().getUserPw())
                .birthday(new SimpleDateFormat("yyyy-mm-dd").format(findMember.get().getBirthday()))
                .sex( (findMember.get().getSex() == 1?"남자":"여자") )
                .name(findMember.get().getName())
                .nickname(findMember.get().getNickname())
                .phone(findMember.get().getPhone())
                .address(findMember.get().getAddress())
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회를 완료했습니다.", findMemberDTO);
    }

    // 회원 조회 리스트 - 관리자
    public ResponseData readMemberList()
    {
        // 조회
        List<Member> memberList = memberRepository.findAllUser("ROLE_USER");

        // DTO 변환
        List<MemberDTO.ReadMemberInfoDTO> readMemberDTOList = memberList.stream()
                .map(member -> MemberDTO.ReadMemberInfoDTO.builder()
                        .id(member.getId())
                        .userId(member.getUserId())
                        .userPw(member.getUserPw())
                        .birthday(new SimpleDateFormat("yyyy-mm-dd").format(member.getBirthday()))
                        .sex( (member.getSex() == 1?"남자":"여자") )
                        .name(member.getName())
                        .nickname(member.getNickname())
                        .phone(member.getPhone())
                        .address(member.getAddress())
                        .build())
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회를 완료했습니다.", readMemberDTOList);
    }



    // 로그인
    public ResponseData login(MemberDTO.LoginInfo loginInfo)
    {
        Optional<Member> member = memberRepository.findByUserId(loginInfo.getUserId());

        if (member.isEmpty())
            return new ResponseData(HttpStatus.NOT_FOUND,"일치하는 회원이 존재하지 않습니다.", null);

        if (!passwordEncoder.matches(loginInfo.getUserPw(), member.get().getUserPw()))
            return new ResponseData(HttpStatus.NOT_FOUND,"비밀번호가 맞지 않습니다.", null);


        String userId = member.get().getUserId();
        String accessToken = jwtTokenUtil.generateAccessToken(member.get().getId(), userId);
        RefreshToken refreshToken = saveRefreshToken(member.get().getId(), userId);

        return new ResponseData(HttpStatus.OK, "성공적으로 로그인했습니다.", TokenDTO.of(accessToken, refreshToken.getRefreshToken()));
    }

    // 로그아웃
    @CacheEvict(value = CacheKey.USER, key = "#userId")
    public ResponseMessage logout(String token, String userId)
    {
        String resolveToken = jwtTokenUtil.resolveToken(token);

        long remainMilliSeconds = jwtTokenUtil.getRemainMilliSeconds(resolveToken);

        refreshTokenRedisRepository.deleteById(userId);
        logoutAccessTokenRedisRepository.save(LogoutAccessToken.of(resolveToken, userId, remainMilliSeconds));

        return new ResponseMessage(HttpStatus.OK, "정상적으로 로그아웃 되었습니다.");
    }

    private RefreshToken saveRefreshToken(Long memberId, String userId) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(userId,
                jwtTokenUtil.generateRefreshToken(memberId, userId), JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
    }

//    public TokenDto reissue(String refreshToken) {
//        refreshToken = resolveToken(refreshToken);
//        String username = getCurrentUsername();
//        RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(username).orElseThrow(NoSuchElementException::new);
//
//        if (refreshToken.equals(redisRefreshToken.getRefreshToken())) {
//            return reissueRefreshToken(refreshToken, username);
//        }
//        throw new IllegalArgumentException("토큰이 일치하지 않습니다.");
//    }


    // 매칭 프로필  ->  이미지, 닉네임, 한줄소개, 매칭 횟수, 기술 평균, 매너 평균
    public ResponseData readMatchingProfile(String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        // member 조회
        Optional<Member> findMember = memberRepository.findById(memberId);

        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        // 뱃지
//        String imgAddress = badgeService.readMyBadge(token).getMessage();
//        String noImg = "data:image/jpeg;base64,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";

        MemberDTO.ReadMatchingProfile readMatchingProfile = MemberDTO.ReadMatchingProfile.builder()
                .id(findMember.get().getId())
                .memberNickname(findMember.get().getNickname())
                .profileImgAddress(findMember.get().getProfileImgAddress())
                .profileContent(findMember.get().getProfileContent())
                .matchingCount(findMember.get().getMatchingCount())
                .badgeImgAddress(badgeService.readMyBadge(token))
                .avgMannerPoint(ratingRepository.findByAvgMannerPoint(memberId)==null?null:Float.parseFloat(String.format("%.2f", ratingRepository.findByAvgMannerPoint(memberId))))
                .avgSkillPoint(ratingRepository.findByAvgSkillPoint(memberId)==null?null:Float.parseFloat(String.format("%.2f", ratingRepository.findByAvgSkillPoint(memberId))))
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", readMatchingProfile);
    }

    // 사진등록,수정
    public ResponseMessage updateProfileImg(MemberDTO.UpdateImgAddress updateImgAddress, String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);

        if (findMember.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");
        String imageUrl = imageProcess.getImageUrl(findMember.get().getUserId(), updateImgAddress.getFile());

        findMember.get().updateProfileImgAddress(imageUrl);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정했습니다.");
    }

    // 한줄소개 등록, 수정
    public ResponseMessage updateProfileContent(MemberDTO.UpdateProfileContent updateProfileContent, String token)
    {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");

        findMember.get().updateProfileContent(updateProfileContent.getProfileContent());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정했습니다.");
    }



}
