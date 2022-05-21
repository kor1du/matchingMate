package com.matching.system.service;

import com.matching.system.domain.Category;
import com.matching.system.domain.MatchingPost;
import com.matching.system.dto.CategoryDTO;
import com.matching.system.process.ImageProcess;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
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
    private final ImageProcess imageProcess;

    // 카테고리 추가
    public ResponseMessage save(CategoryDTO.CreateCategoryDTO createCategoryDTO)
    {
//        if (categoryDTO.getName() == null || categoryDTO.getImgAddress() == null)
//            return new ResponseMessage(HttpStatus.BAD_REQUEST, "빈 값이 존재합니다.");

        System.out.println("createCategoryDTO = " + createCategoryDTO.getName());

        Optional<Category> findCategory = categoryRepository.findByName(createCategoryDTO.getName());

        if (findCategory.isPresent()) return new ResponseMessage(HttpStatus.CONFLICT, "이미 등록된 동일한 카테고리가 존재합니다.");

        String imgUrl = imageProcess.getImageUrl(createCategoryDTO.getName(), createCategoryDTO.getCategoryImgFile());

        // entity 변환
        Category category = Category.builder()
                .name(createCategoryDTO.getName())
                .imgAddress(imgUrl)
                .build();

        // 저장
        categoryRepository.save(category);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 동륵되었습니다.");
    }

    // 카테고리 수정
    public ResponseMessage update(CategoryDTO.UpdateCategoryDTO updateCategoryDTO)
    {
//        if (StringUtils.isEmpty(categoryDTO.()) == null || categoryDTO.getImgAddress() == null)
//            return new ResponseMessage(HttpStatus.BAD_REQUEST, "빈 값이 존재합니다.");
        Category findCategory = categoryRepository.findById(updateCategoryDTO.getCategoryId()).get();

        String imgUrl = imageProcess.getImageUrl(updateCategoryDTO.getName(), updateCategoryDTO.getCategoryImgFile());

        findCategory.updateName(updateCategoryDTO.getName());
        findCategory.updateImgAddress(imgUrl);

        return new ResponseMessage(HttpStatus.OK, "정상적으로 수정되었습니다.");
    }

    // 카테고리 삭제
    public ResponseMessage delete(Long categoryId)
    {
        // 연관 post에는 null
//        matchingPostRepository.findByCategoryId(categoryId).stream()
//                .forEach(matchingPost -> matchingPost.deleteCategory());
        Category findCategory = categoryRepository.findById(categoryId).get();

        Optional<MatchingPost> findMatchingPost = matchingPostRepository.findByExistCategory(findCategory);
        if (! findMatchingPost.isEmpty())
            return new ResponseMessage(HttpStatus.NOT_ACCEPTABLE, "이미 이 카테고리는 사용중입니다.");


        categoryRepository.deleteById(categoryId);

        return  new ResponseMessage(HttpStatus.OK, "정상적으로 삭제되었습니다.");
    }

    // 카테고리 조회
    public ResponseData readCategories()
    {
        List<CategoryDTO.ReadCategoryDTO> categoryDTOList = categoryRepository.findAll().stream()
                .map(findCategory -> CategoryDTO.ReadCategoryDTO.builder()
                        .id(findCategory.getId())
                        .name(findCategory.getName())
                        .imgAddress(findCategory.getImgAddress())
                        .build())

                .collect(Collectors.toList());

        return new ResponseData(HttpStatus.OK, "정상적으로 조회되었습니다.", categoryDTOList);
    }

}
