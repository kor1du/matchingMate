package com.matching.system.service;

import com.matching.system.customRepository.CategoryCustomRepository;
import com.matching.system.customRepository.MatchingHistoryCustomRepository;
import com.matching.system.domain.*;
import com.matching.system.dto.CategoryDTO;
import com.matching.system.dto.MatchingHistoryDTO;
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
import java.util.*;
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
    private final MatchingHistoryCustomRepository matchingHistoryCustomRepository;
    private final CategoryCustomRepository categoryCustomRepository;

    // 회원가입
    public ResponseMessage save(MemberDTO.SignUpDTO signUpDTO) {
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
                .sex((signUpDTO.getSex().equals("남자") ? 1 : 2))
                .birthday(signUpDTO.getBirthday())
                .phone(signUpDTO.getPhone())
                .profileImgAddress("https://i.ibb.co/nwJNrYz/facebook-profile-image.png")
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
    public ResponseMessage checkDuplicateId(MemberDTO.CheckDuplicateId checkDuplicateId) {
        Optional<Member> findMember = memberRepository.findByUserId(checkDuplicateId.getUserId());

        if (findMember.isEmpty())
            return new ResponseMessage(HttpStatus.OK, "가입 가능한 아이디입니다.");

        return new ResponseMessage(HttpStatus.CONFLICT, "아이디가 이미 존재합니다.");

    }

    public ResponseMessage checkDuplicateNickname(MemberDTO.CheckDuplicateNickname checkDuplicateNickname) {
        Optional<Member> findMember = memberRepository.findByNickname(checkDuplicateNickname.getNickname());

        if (findMember.isEmpty())
            return new ResponseMessage(HttpStatus.OK, "가입 가능한 아이디입니다.");

        return new ResponseMessage(HttpStatus.CONFLICT, "아이디가 이미 존재합니다.");

    }

    // 회원수정
    public ResponseMessage update(MemberDTO.UpdateAccountDTO updateAccountDTO, String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);

        if (findMember.isEmpty())
            return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다..");

        // update
        if(updateAccountDTO.getUserPw() != null) findMember.get().updateUserPw(passwordEncoder.encode(updateAccountDTO.getUserPw()));
        if(updateAccountDTO.getName() != null)findMember.get().updateName(updateAccountDTO.getName());
        if(updateAccountDTO.getNickname() != null)findMember.get().updateNickname(updateAccountDTO.getNickname());
        if(updateAccountDTO.getPhone() != null)findMember.get().updatePhone(updateAccountDTO.getPhone());
        if(updateAccountDTO.getAddress() != null)findMember.get().updateAddress(updateAccountDTO.getAddress());
        if(updateAccountDTO.getBirthday() != null)findMember.get().updateBirthday(updateAccountDTO.getBirthday());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 변경되었습니다.");
    }


    // 회원 탈퇴

    // matching post -> memberId = null
    // report -> targetMemberId, memberId = null
    // rating -> targetMemberId, memberId = null
    public ResponseMessage deleteMember(String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);

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
        for (MatchingPost matchingPost : matchingPostList) {
            if (matchingPost.getIsCompleted() == 1)
                matchingPost.deleteMember();
            else {
                Optional<ChattingRoom> chattingRoom = chattingRoomRepository.findByMatchingPostId(matchingPost.getId());
                chattingRoom.get().deleteMatchingPost();
//                        .(ChattingRoom::deleteMatchingPost);
                matchingPostRepository.deleteById(matchingPost.getId());
            }
        }

        // 관심 카테고리, 알림, matching member, chatting member
        memberRepository.deleteById(memberId);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 삭제되었습니다.");
    }

    // 회원 조회 - 한명
    public ResponseData readMemberOfAdmin(Long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);

        if (memberId == null) return new ResponseData(HttpStatus.NOT_FOUND, "탈퇴한 회원입니다.", null);


        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        MemberDTO.ReadMemberInfoDTO findMemberDTO = MemberDTO.ReadMemberInfoDTO.builder()
                .id(findMember.get().getId())
                .userId(findMember.get().getUserId())
                .userPw(findMember.get().getUserPw())
                .birthday(new SimpleDateFormat("yyyy-mm-dd").format(findMember.get().getBirthday()))
                .sex((findMember.get().getSex() == 1 ? "남자" : "여자"))
                .name(findMember.get().getName())
                .nickname(findMember.get().getNickname())
                .phone(findMember.get().getPhone())
                .address(findMember.get().getAddress())
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회를 완료했습니다.", findMemberDTO);
    }

    public ResponseData readMemberOfUser(String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);

        if (memberId == null) return new ResponseData(HttpStatus.NOT_FOUND, "탈퇴한 회원입니다.", null);


        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        MemberDTO.ReadMyInfoDTO findMemberDTO = MemberDTO.ReadMyInfoDTO.builder()
                .userId(findMember.get().getUserId())
                .userPw(findMember.get().getUserPw())
                .birthday(new SimpleDateFormat("yyyy-MM-dd").format(findMember.get().getBirthday()))
                .sex((findMember.get().getSex() == 1 ? "남자" : "여자"))
                .name(findMember.get().getName())
                .nickname(findMember.get().getNickname())
                .phone(findMember.get().getPhone())
                .address(findMember.get().getAddress())
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회를 완료했습니다.", findMemberDTO);
    }

    // 회원 조회 리스트 - 관리자
    public ResponseData readMemberList() {
        // 조회
        List<Member> memberList = memberRepository.findAllUser("ROLE_USER");

        // DTO 변환
        List<MemberDTO.ReadMemberInfoDTO> readMemberDTOList = memberList.stream()
                .map(member -> MemberDTO.ReadMemberInfoDTO.builder()
                        .id(member.getId())
                        .userId(member.getUserId())
                        .userPw(member.getUserPw())
                        .birthday(new SimpleDateFormat("yyyy-MM-dd").format(member.getBirthday()))
                        .sex((member.getSex() == 1 ? "남자" : "여자"))
                        .name(member.getName())
                        .nickname(member.getNickname())
                        .phone(member.getPhone())
                        .address(member.getAddress())
                        .build())
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회를 완료했습니다.", readMemberDTOList);
    }


    // 로그인
    public ResponseData login(MemberDTO.LoginInfo loginInfo) {
        Optional<Member> member = memberRepository.findByUserId(loginInfo.getUserId());

        if (member.isEmpty())
            return new ResponseData(HttpStatus.NOT_FOUND, "일치하는 회원이 존재하지 않습니다.", null);

        if (!passwordEncoder.matches(loginInfo.getUserPw(), member.get().getUserPw()))
            return new ResponseData(HttpStatus.NOT_FOUND, "비밀번호가 맞지 않습니다.", null);


        String userId = member.get().getUserId();
        String accessToken = jwtTokenUtil.generateAccessToken(member.get().getId(), userId);
        RefreshToken refreshToken = saveRefreshToken(member.get().getId(), userId);

        MemberDTO.LoginResponseDTO loginResponseDTO = MemberDTO.LoginResponseDTO.builder()
                    .tokenDTO(TokenDTO.of(accessToken, refreshToken.getRefreshToken()))
                    .nickname(member.get().getNickname())
                    .profileImgAddress(member.get().getProfileImgAddress())
                    .role(member.get().getAuthorities().stream().findFirst().toString())
                .build();

        return new ResponseData(HttpStatus.OK, "성공적으로 로그인했습니다.", loginResponseDTO);
    }

    // 로그아웃
    @CacheEvict(value = CacheKey.USER, key = "#userId")
    public ResponseMessage logout(String token, String userId) {
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

    // 위치 업데이트
    public ResponseMessage updateLocation(MemberDTO.UpdateLocation updateLocation, String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");

        findMember.get().updateRecentLocation(updateLocation.getLocation());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 처리되었습니다.");
    }

    // 매칭 프로필  ->  이미지, 닉네임, 한줄소개, 매칭 횟수, 기술 평균, 매너 평균
    public ResponseData readMatchingProfile(String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        // member 조회
        Optional<Member> findMember = memberRepository.findById(memberId);

        if (findMember.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.", null);

        // 월별 매칭 횟수
        List<MatchingHistoryDTO.ChartData> matchingCountChartData = matchingCountChartDataProcess(matchingHistoryCustomRepository.monthlyMatchingCount(memberId)).stream()
                .sorted(Comparator.comparing(MatchingHistoryDTO.ChartData::getLabel))
                .collect(Collectors.toList());
        MatchingHistoryDTO.ChartDataProcess matchingCountChartDataProcess = processChartData(matchingCountChartData);


        // 카테고리 분포도
//        List<MatchingHistoryDTO.ChartData> categoryChartData = categoryDistributionChartDataProcess(matchingHistoryCustomRepository.categoryDistribution(memberId));
        List<MatchingHistoryDTO.ChartData> categoryChartData = matchingHistoryCustomRepository.categoryDistribution(memberId);
        MatchingHistoryDTO.ChartDataProcess categoryChartDataProcess = processChartData(categoryChartData);

        MemberDTO.ReadMatchingProfile readMatchingProfile = MemberDTO.ReadMatchingProfile.builder()
                .id(findMember.get().getId())
                .memberNickname(findMember.get().getNickname())
                .profileImgAddress(findMember.get().getProfileImgAddress())
                .profileContent(findMember.get().getProfileContent())
                .matchingCount(findMember.get().getMatchingCount())
                .badgeImgAddress(badgeService.readMyBadge(token))
                .avgMannerPoint(ratingRepository.findByAvgMannerPoint(memberId) == null ? null : Float.parseFloat(String.format("%.2f", ratingRepository.findByAvgMannerPoint(memberId))))
                .avgSkillPoint(ratingRepository.findByAvgSkillPoint(memberId) == null ? null : Float.parseFloat(String.format("%.2f", ratingRepository.findByAvgSkillPoint(memberId))))
                .matchingCountChart(matchingCountChartDataProcess)
                .categoryDistributionChart(categoryChartDataProcess)
                .build();

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", readMatchingProfile);
    }

    // 사진등록,수정
    public ResponseMessage updateProfileImg(MemberDTO.UpdateImgAddress updateImgAddress, String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);

        if (findMember.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");
        String imageUrl = imageProcess.getImageUrl(findMember.get().getUserId(), updateImgAddress.getFile());

        findMember.get().updateProfileImgAddress(imageUrl);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정했습니다.");
    }

    // 한줄소개 등록, 수정
    public ResponseMessage updateProfileContent(MemberDTO.UpdateProfileContent updateProfileContent, String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 회원이 존재하지 않습니다.");

        findMember.get().updateProfileContent(updateProfileContent.getProfileContent());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정했습니다.");
    }

    private List<MatchingHistoryDTO.ChartData> matchingCountChartDataProcess(List<MatchingHistoryDTO.ChartData> chartDataList) {
//        matchingCountChartDataList.stream()
//                .forEach(matchingCountChartData -> System.out.println(matchingCountChartData.getX() + ", " + matchingCountChartData.getY()));

        if (chartDataList.size() == 12) return chartDataList;

        List<MatchingHistoryDTO.ChartData> newChartDataList = new ArrayList<>();

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM");

        boolean hasMonth;

        for (int i = 1; i < 13; i++) {
            hasMonth = false;

            for (int j = 0; j < chartDataList.size(); j++) {
                if (simpleDateFormat.format(cal.getTime()).equals(chartDataList.get(j).getLabel())) {
                    newChartDataList.add(new MatchingHistoryDTO.ChartData(chartDataList.get(j).getLabel(), chartDataList.get(j).getData()));
                    hasMonth = true;
                    continue;
                }
            }

            if (!hasMonth)
                newChartDataList.add(new MatchingHistoryDTO.ChartData(simpleDateFormat.format(cal.getTime()), 0L));

            cal.add(Calendar.MONTH, -1);
        }

        return newChartDataList;
    }

    private List<MatchingHistoryDTO.ChartData> categoryDistributionChartDataProcess(List<MatchingHistoryDTO.ChartData> chartDataList) {
        chartDataList.stream()
                .forEach(chartData -> System.out.println("chartData.getLabel() = " + chartData.getLabel()));

        List<CategoryDTO.ReadCategoryNameDTO> readCategoryNameDTOList = categoryCustomRepository.readCategoryName();

        if (chartDataList.size() == readCategoryNameDTOList.size()) return chartDataList;

        List<MatchingHistoryDTO.ChartData> newChartDataList = new ArrayList<>();

        boolean hasCategory;

        for (int i = 0; i < readCategoryNameDTOList.size(); i++) {
            hasCategory = false;

            for (int j = 0; j < chartDataList.size(); j++) {
                System.out.println("chartDataList = " + chartDataList.get(j).getLabel());
                if (chartDataList.get(j).getLabel().equals(readCategoryNameDTOList.get(i).getName())) {
                    newChartDataList.add(chartDataList.get(j));
                    hasCategory = true;
                    continue;
                }
            }

            if (! hasCategory) {
                newChartDataList.add(new MatchingHistoryDTO.ChartData(readCategoryNameDTOList.get(i).getName(), 0L));
            }

        }

        return newChartDataList;
    }

    private MatchingHistoryDTO.ChartDataProcess processChartData(List<MatchingHistoryDTO.ChartData> chartDataList)
    {

        List<String> labelList = chartDataList.stream()
                .map(chartData -> (chartData.getLabel()))
                .collect(Collectors.toList());

        List<String> dataList = chartDataList.stream()
                .map(chartData -> String.valueOf(chartData.getData()))
                .collect(Collectors.toList());

        return new MatchingHistoryDTO.ChartDataProcess(labelList, dataList);
    }

}
