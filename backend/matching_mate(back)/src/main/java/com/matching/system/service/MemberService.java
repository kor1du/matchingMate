package com.matching.system.service;

import com.matching.system.config.AccessConfig;
import com.matching.system.domain.*;
import com.matching.system.dto.MemberDTO;
import com.matching.system.dto.PagingDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.filter.ResponseMessage;
import com.matching.system.jwt.JwtExpirationEnums;
import com.matching.system.jwt.TokenDTO;
import com.matching.system.jwt.redis.*;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.repository.MatchingPostRepository;
import com.matching.system.repository.MemberRepository;
import com.matching.system.repository.RatingRepository;
import com.matching.system.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final RatingRepository ratingRepository;
    private final MemberRepository memberRepository;
    private final MatchingPostRepository matchingPostRepository;
    private final ReportRepository reportRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final AccessConfig accessConfig;

    private final Logger log = LoggerFactory.getLogger(getClass());


    // 회원가입
    public ResponseMessage save(MemberDTO.SignUpDTO signUpDTO)
    {
        // 중복 확인
        Optional<Member> findMember = memberRepository.findByUserIdAndPhone(signUpDTO.getUserId(), signUpDTO.getPhone());

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

        System.out.println("user Id is ... "+memberRepository.findByUserId(checkDuplicateId.getUserId()));
        if (findMember.isEmpty())
            return new ResponseMessage(HttpStatus.OK, "가입 가능한 아이디입니다.");

        return new ResponseMessage(HttpStatus.CONFLICT, "아이디가 이미 존재합니다.");

    }

    // 회원수정
    public ResponseMessage update(MemberDTO.UpdateAccountDTO updateAccountDTO, String accessToken)
    {
        Optional<Member> findMember = memberRepository.findById(updateAccountDTO.getId());

        if (findMember.isEmpty())
            return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다..");

        if (! accessConfig.isNormal(findMember.get().getUserId(), accessToken))
            return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "정상적인 접근이 아닙니다.");

        // update
        findMember.get().updateUserPw(passwordEncoder.encode(updateAccountDTO.getUserPw()));
        findMember.get().updateName(updateAccountDTO.getName());
        findMember.get().updateNickname(updateAccountDTO.getNickname());
        findMember.get().updatePhone(updateAccountDTO.getPhone());
        findMember.get().updateAddress(updateAccountDTO.getAddress());
        findMember.get().updateBirthday(updateAccountDTO.getBirthday());
        findMember.get().updateSex( (updateAccountDTO.getSex().equals("남자")?1:2) );

        return new ResponseMessage(HttpStatus.OK, "정상적으로 변경되었습니다.");
   }


    // 회원 탈퇴

    // matching post -> memberId = null
    // report -> targetMemberId, memberId = null
    // rating -> targetMemberId, memberId = null
    public ResponseMessage deleteMember(Long memberId, String accessToken)
    {
        Optional<Member> findMember  = memberRepository.findById(memberId);

        if (findMember.isEmpty())
            return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");

        if (! accessConfig.isNormal(findMember.get().getUserId(), accessToken))
            return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "정상적인 접근이 아닙니다.");

        // report - member
        reportRepository.findByMemberId(memberId)
                .forEach(Report::deleteMember);

        // report -targetMember
        reportRepository.deleteByTargetMemberId(memberId);


        // rating - member
        ratingRepository.findByMemberId(memberId)
                .forEach(Rating::deleteMember);

        // report - targetMember
        ratingRepository.deleteByTargetMemberId(memberId);

        // matching Post
        matchingPostRepository.findByMemberId(memberId)
                .forEach(MatchingPost::deleteMember);

        // 관심 카테고리, 알림, matching member, chatting member
        memberRepository.deleteById(memberId);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 삭제되었습니다.");
    }

    // 회원 조회 - 한명
    public ResponseData readMember(Long memberId, String accessToken)
    {
        Optional<Member> findMember  = memberRepository.findById(memberId);

        if (! accessConfig.isNormal(findMember.get().getUserId(), accessToken))
            return new ResponseData(HttpStatus.NOT_ACCEPTABLE, "정상적인 접근이 아닙니다.", null);

        if (memberId == null) return new ResponseData(HttpStatus.NOT_FOUND, "탈퇴한 회원입니다.", null);


        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);


        MemberDTO.ReadMemberDTO findMemberDTO = MemberDTO.ReadMemberDTO.builder()
                .id(findMember.get().getId())
                .userId(findMember.get().getUserId())
                .userPw(findMember.get().getUserPw())
                .birthday(findMember.get().getBirthday())
                .sex( (findMember.get().getSex() == 1?"남자":"여자") )
                .name(findMember.get().getName())
                .nickname(findMember.get().getNickname())
                .phone(findMember.get().getPhone())
                .address(findMember.get().getAddress())
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회를 완료했습니다.", findMemberDTO);
    }

    // 회원 조회 리스트 - 관리자
    public ResponseData readMemberList(PagingDTO paging)
    {
        // 페이징
        Pageable pageRequest = PageRequest.of(paging.getFirstPage(), paging.getPageCount());

        // 조회
        List<Member> memberList = memberRepository.findAllUser("ROLE_USER", pageRequest);

        // DTO 변환
        List<MemberDTO.ReadMemberDTO> readMemberDTOList = memberList.stream()
                .map(member -> MemberDTO.ReadMemberDTO.builder()
                        .id(member.getId())
                        .userId(member.getUserId())
                        .userPw(member.getUserPw())
                        .birthday(member.getBirthday())
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
        String accessToken = jwtTokenUtil.generateAccessToken(userId);
        RefreshToken refreshToken = saveRefreshToken(userId);

        return new ResponseData(HttpStatus.OK, "성공적으로 로그인했습니다.", TokenDTO.of(accessToken, refreshToken.getRefreshToken()));
    }

    // 로그아웃
    @CacheEvict(value = CacheKey.USER, key = "#userId")
    public ResponseMessage logout(String accessToken, String userId)
    {
        String resolveAccessToken = resolveToken(accessToken);

        long remainMilliSeconds = jwtTokenUtil.getRemainMilliSeconds(resolveAccessToken);

        refreshTokenRedisRepository.deleteById(userId);
        logoutAccessTokenRedisRepository.save(LogoutAccessToken.of(resolveAccessToken, userId, remainMilliSeconds));

        return new ResponseMessage(HttpStatus.OK, "정상적으로 로그아웃 되었습니다.");
    }

    private RefreshToken saveRefreshToken(String userId) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(userId,
                jwtTokenUtil.generateRefreshToken(userId), JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
    }


    private String resolveToken(String token)
    {
        return token.substring(7);
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
    public ResponseData readMatchingProfile(Long memberId, String accessToken)
    {
        // member 조회
        Optional<Member> findMember = memberRepository.findById(memberId);

        if (! accessConfig.isNormal(findMember.get().getUserId(), accessToken))
            return new ResponseData(HttpStatus.NOT_ACCEPTABLE, "정상적인 접근이 아닙니다.", null);

        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        MemberDTO.ReadMatchingProfile readMatchingProfile = MemberDTO.ReadMatchingProfile.builder()
                .id(findMember.get().getId())
                .profileImgAddress(findMember.get().getProfileImgAddress())
                .profileContent(findMember.get().getProfileContent())
                .matchingCount(findMember.get().getMatchingCount())
                .avgMannerPoint(ratingRepository.findByAvgMannerPoint(memberId))
                .avgSkillPoint(ratingRepository.findByAvgSkillPoint(memberId))
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", readMatchingProfile);
    }

    // 사진등록,수정
    public ResponseMessage updateProfileImg(MemberDTO.UpdateImgAddress updateImgAddress)
    {
        Optional<Member> findMember = memberRepository.findById(updateImgAddress.getId());

        if (findMember.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");

        findMember.get().updateProfileImgAddress(updateImgAddress.getProfileImgAddress());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정했습니다.");
    }

    // 한줄소개 등록, 수정
    public ResponseMessage updateProfileContent(MemberDTO.UpdateProfileContent updateProfileContent)
    {
        Optional<Member> findMember = memberRepository.findById(updateProfileContent.getId());

        if (findMember.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");

        findMember.get().updateProfileContent(updateProfileContent.getProfileContent());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정했습니다.");
    }



}
