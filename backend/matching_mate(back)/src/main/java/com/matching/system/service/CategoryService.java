package com.matching.system.service;

import com.matching.system.domain.Category;
import com.matching.system.dto.CategoryDTO;
import com.matching.system.dto.response.ResponseData;
import com.matching.system.dto.response.ResponseMessage;
import com.matching.system.repository.CategoryRepository;
import com.matching.system.repository.MatchingPostRepository;
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
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final MatchingPostRepository matchingPostRepository;

    // 카테고리 추가 + 수정?
    public ResponseMessage save(CategoryDTO categoryDTO)
    {
//        if (categoryDTO.getName() == null || categoryDTO.getImgAddress() == null)
//            return new ResponseMessage(HttpStatus.BAD_REQUEST, "빈 값이 존재합니다.");

        Optional<Category> findCategory = categoryRepository.findByNameAndImgAddress(categoryDTO.getName(), categoryDTO.getImgAddress());

        if (findCategory.isPresent()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 등록된 동일한 카테고리가 존재합니다.");

        // entity 변환
        Category category = Category.builder()
                .name(categoryDTO.getName())
                .imgAddress(categoryDTO.getImgAddress())
                .build();

        // 저장
        categoryRepository.save(category);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 동륵되었습니다.");
    }

    // 카테고리 수정
    public ResponseMessage update(CategoryDTO categoryDTO)
    {
//        if (StringUtils.isEmpty(categoryDTO.()) == null || categoryDTO.getImgAddress() == null)
//            return new ResponseMessage(HttpStatus.BAD_REQUEST, "빈 값이 존재합니다.");

        // entity 변환
        Category findCategory = categoryRepository.findById(categoryDTO.getId()).get();
        findCategory.updateName(categoryDTO.getName());
        findCategory.updateImgAddress(categoryDTO.getImgAddress());

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정되었습니다.");
    }

    // 카테고리 삭제
    public ResponseMessage delete(Long categoryId)
    {
        // 연관 post에는 null
        matchingPostRepository.findByCategoryId(categoryId).stream()
                .forEach(matchingPost -> matchingPost.deleteCategory());

        categoryRepository.deleteById(categoryId);

        return  new ResponseMessage(HttpStatus.OK, "정상적으로 삭제되었습니다.");
    }

    // 카테고리 조회
    public ResponseData readCategories()
    {
        List<CategoryDTO> categoryDTOList = categoryRepository.findAll().stream()
                .map(category -> new CategoryDTO(category.getId(), category.getName(), category.getImgAddress()))
                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", categoryDTOList);
    }

}
