package com.matching.system.service;

import com.matching.system.config.AccessConfig;
import com.matching.system.domain.Category;
import com.matching.system.domain.InterestCategory;
import com.matching.system.domain.Member;
import com.matching.system.dto.InterestCategoryDTO;
import com.matching.system.filter.ResponseData;
import com.matching.system.filter.ResponseMessage;
import com.matching.system.repository.CategoryRepository;
import com.matching.system.repository.InterestCategoryRepository;
import com.matching.system.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final AccessConfig accessConfig;

    // 관심 카테고리 추가
    public ResponseMessage save(InterestCategoryDTO.CreateDTO createDTO) {
        // null 체크
        
        Optional<InterestCategory> findInterestCategory = interestCategoryRepository.findByMemberIdAndCategoryIdAndRegion1AndRegion2AndRegion3(createDTO.getMemberId(), createDTO.getCategoryId(), createDTO.getRegion1(), createDTO.getRegion2(), createDTO.getRegion3());
        if (findInterestCategory.isPresent()) return  new ResponseMessage(HttpStatus.CONFLICT, "이미 동일한 관심 카테고리가 존재합니다.");

        // 카테고리 검색
        Optional<Category> findCategory = categoryRepository.findById(createDTO.getCategoryId());
        if (findCategory.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 카테고리가 존재하지 않습니다.");

        // 회원 검색
        Member member = memberRepository.findById(createDTO.getMemberId()).get();

        InterestCategory interestCategory = InterestCategory.builder()
                .category(findCategory.get())
                .member(member)
                .region1(createDTO.getRegion1())
                .region2(createDTO.getRegion2())
                .region3(createDTO.getRegion3())
                .build();

        interestCategoryRepository.save(interestCategory);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 등록되었습니다.");
    }

    // 관심 카테고리 수정
    public ResponseMessage update(InterestCategoryDTO.UpdateDTO interestCategoryDTO) {
        // null 체크

        // 관심 카테고리 검색
        Optional<InterestCategory> findInterestCategory = interestCategoryRepository.findById(interestCategoryDTO.getId());
        if (findInterestCategory.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 관심 카테고리가 존재하지 않습니다.");

        // 카테고리 검색
        Optional<Category> findCategory = categoryRepository.findById(interestCategoryDTO.getCategoryId());
        if (findCategory.isEmpty()) return new ResponseMessage(HttpStatus.NOT_FOUND, "검색한 카테고리가 존재하지 않습니다.");

        // 회원 검색
        Member member = memberRepository.findById(interestCategoryDTO.getMemberId()).get();

        findInterestCategory.get().updateCategory(findCategory.get());
        findInterestCategory.get().updateMember(member);
        findInterestCategory.get().updateRegion1(interestCategoryDTO.getRegion1());
        findInterestCategory.get().updateRegion2(interestCategoryDTO.getRegion2());
        findInterestCategory.get().updateRegion3(interestCategoryDTO.getRegion3());

        return  new ResponseMessage(HttpStatus.OK, "정상적으로 수정되었습니다.");
    }

    // 관심 카테고리 삭제
    public ResponseMessage delete(Long interestCategoryId) {

        interestCategoryRepository.deleteById(interestCategoryId);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 삭제되었습니다.");
    }


    // 관심 카테고리 조회
    public ResponseData read(Long memberId, String accessToken) {
        Optional<Member> findMember = memberRepository.findById(memberId);

        if (! accessConfig.isNormal(findMember.get().getUserId(), accessToken))
            return new ResponseData(HttpStatus.NOT_ACCEPTABLE, "정상적인 접근이 아닙니다.", null);

        List<InterestCategoryDTO.ReadDTO> updateReadDTOList = interestCategoryRepository.findByMemberId(findMember.get()).stream()
                .map(interestCategory -> InterestCategoryDTO.ReadDTO.builder()
                        .id(interestCategory.getId())
                        .categoryId(interestCategory.getCategory().getId())
                        .categoryName(interestCategory.getCategory().getName())
                        .categoryImgAddress(interestCategory.getCategory().getImgAddress())
                        .memberId(interestCategory.getMember().getId())
                        .region1(interestCategory.getRegion1())
                        .region2(interestCategory.getRegion2())
                        .region3(interestCategory.getRegion3())
                        .build())
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", updateReadDTOList);
    }



}
