package com.matching.system.customRepository;

import com.matching.system.dto.InterestCategoryDTO;

import java.util.List;
import java.util.Optional;

public interface InterestCategoryCustomRepository {

    boolean findByMemberIdAndCategoryIdAndRegion1AndRegion2AndRegion3(Long memberId, Long categoryId, String region1, String region2, String region3);

    void updateInterestCategory(InterestCategoryDTO.UpdateDTO updateDTO);

    void deleteInterestCategory(Long interestCategoryId);

    Optional<InterestCategoryDTO.ReadDTO> findByMemberId(Long memberId);

    List<InterestCategoryDTO.MemberInterestCategoryDTO> findByInterestCategoryMember(Long categoryId, String place);

}
