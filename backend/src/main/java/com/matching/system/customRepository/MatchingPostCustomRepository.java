package com.matching.system.customRepository;

import com.matching.system.domain.MatchingPost;
import com.matching.system.dto.MatchingPostDTO;

import java.util.List;
import java.util.Optional;

public interface MatchingPostCustomRepository {

//    List<MatchingPost> findByRecentPosts(String address);

    List<MatchingPostDTO.ReadSimpleMatchingPostDTO> findByRecentCategoryPosts(Long categoryId, String address, String level);

//    List<MatchingPost> findByPopularPosts(String address);

    List<MatchingPostDTO.ReadSimpleMatchingPostDTO> findByPopularCategoryPosts(Long categoryId, String address, String level);

    Optional<MatchingPostDTO.ReadDetailMatchingPostDTO> findByDetailMatchingPost(Long matchingPostId);

    Optional<MatchingPost> findById(Long matchingPostId);

    List<MatchingPost> findAll();

    List<MatchingPost> findByMemberId(Long memberId);

    List<MatchingPost> findByCategoryId(Long categoryId);

}
