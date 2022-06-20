package com.matching.system.service;

import com.matching.system.domain.Category;
import com.matching.system.domain.InterestCategory;
import com.matching.system.domain.Member;
import com.matching.system.dto.InterestCategoryDTO;
import com.matching.system.jwt.util.JwtTokenUtil;
import com.matching.system.repository.CategoryRepository;
import com.matching.system.repository.InterestCategoryRepository;
import com.matching.system.repository.MemberRepository;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class InterestCategoryService {
    private final InterestCategoryRepository interestCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenUtil jwtTokenUtil;

    // 관심 카테고리 추가
    public ResponseData save(InterestCategoryDTO.CreateDTO createDTO, String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        // null 체크
        Optional<InterestCategory> findInterestCategory = interestCategoryRepository.findByMemberIdAndCategoryId(memberId, createDTO.getCategoryId());
        if (findInterestCategory.isPresent()) return  new ResponseData(HttpStatus.CONFLICT, "이미 동일한 관심 카테고리가 존재합니다.", null);

        // 카테고리 검색
        Optional<Category> findCategory = categoryRepository.findById(createDTO.getCategoryId());
        if (findCategory.isEmpty()) return new ResponseData(HttpStatus.NOT_FOUND, "검색한 카테고리가 존재하지 않습니다.", null);

        // 회원 검색
        Member member = memberRepository.findById(memberId).get();

        InterestCategory interestCategory = InterestCategory.builder()
                .category(findCategory.get())
                .member(member)
                .build();

        interestCategoryRepository.save(interestCategory);

        return new ResponseData(HttpStatus.OK, "정상적으로 등록되었습니다.", read(token).getData());
    }

    // 관심 카테고리 수정
    public ResponseMessage update(InterestCategoryDTO.UpdateDTO interestCategoryDTO, String token) {
        // null 체크

        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        // 관심 카테고리 검색
        Optional<InterestCategory> findInterestCategory = interestCategoryRepository.findById(interestCategoryDTO.getId());
        if (findInterestCategory.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 관심 카테고리가 존재하지 않습니다.");

        // 카테고리 검색
        Optional<Category> findCategory = categoryRepository.findById(interestCategoryDTO.getCategoryId());
        if (findCategory.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 카테고리가 존재하지 않습니다.");

        // 회원 검색
        Member member = memberRepository.findById(memberId).get();

        findInterestCategory.get().updateCategory(findCategory.get());
        findInterestCategory.get().updateMember(member);

        return  new ResponseMessage(HttpStatus.OK, "정상적으로 수정되었습니다.");
    }

    // 관심 카테고리 삭제
    public ResponseMessage delete(Long interestCategoryId) {

        interestCategoryRepository.deleteById(interestCategoryId);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 삭제되었습니다.");
    }


    // 관심 카테고리 조회
    public ResponseData read(String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);

        List<InterestCategory> interestCategoryList = interestCategoryRepository.findByMemberId(findMember.get());

        if (interestCategoryList.isEmpty()) return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", null);

        List<InterestCategoryDTO.ReadDTO> updateReadDTOList = interestCategoryList.stream()
                .map(interestCategory ->  InterestCategoryDTO.ReadDTO.builder()
                        .id(interestCategory.getId())
                        .categoryId(interestCategory.getCategory().getId())
                        .categoryName(interestCategory.getCategory().getName())
                        .categoryImgAddress(interestCategory.getCategory().getImgAddress())
                        .build())
                .sorted(Comparator.comparing(InterestCategoryDTO.ReadDTO::getId))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", updateReadDTOList);
    }


    public ResponseData readMyInterest(String token) {
        Long memberId = jwtTokenUtil.getMemberId(jwtTokenUtil.resolveToken(token));

        Optional<Member> findMember = memberRepository.findById(memberId);

        List<InterestCategory> interestCategoryList = interestCategoryRepository.findByMemberId(findMember.get());

        if (interestCategoryList.isEmpty()) return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", null);

        List<InterestCategoryDTO.ReadMyInterestDTO> updateReadDTOList = interestCategoryList.stream()
                .map(interestCategory ->  InterestCategoryDTO.ReadMyInterestDTO.builder()
                        .id(interestCategory.getCategory().getId())
                        .name(interestCategory.getCategory().getName())
                        .imgAddress(interestCategory.getCategory().getImgAddress())
                        .build())
                .sorted(Comparator.comparing(InterestCategoryDTO.ReadMyInterestDTO::getId))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", updateReadDTOList);
    }

}
