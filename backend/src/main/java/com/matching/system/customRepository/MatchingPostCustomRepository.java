package com.matching.system.customRepository;

import com.matching.system.domain.Category;
import com.matching.system.domain.MatchingPost;
import com.matching.system.dto.MatchingPostDTO;

import java.util.List;
import java.util.Optional;

public interface MatchingPostCustomRepository {

//    List<MatchingPost> findByRecentPosts(String address);

    List<MatchingPostDTO.ReadSimpleMatchingPostDTO> findByRecentCategoryPosts(Category category, String address);

//    List<MatchingPost> findByPopularPosts(String address);

    List<MatchingPostDTO.ReadSimpleMatchingPostDTO> findByPopularCategoryPosts(Category category, String address);

    Optional<MatchingPostDTO.ReadDetailMatchingPostDTO> findByDetailMatchingPost(Long matchingPostId);

    Optional<MatchingPost> findById(Long matchingPostId);



    List<MatchingPost> findAll();

    List<MatchingPost> findByMemberId(Long memberId);

    List<MatchingPost> findByCategoryId(Long categoryId);

}
