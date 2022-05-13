package com.matching.system.control;

import com.matching.system.dto.CategoryDTO;
import com.matching.system.response.ResponseData;
import com.matching.system.response.ResponseMessage;
import com.matching.system.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/category")
public class CategoryControl {
    private final CategoryService categoryService;

    // 카테고리 추가      -> O
    @PostMapping("/create")
    public ResponseEntity save(@RequestBody CategoryDTO.CreateCategoryDTO createCategoryDTO)
    {
        ResponseMessage responseMessage = categoryService.save(createCategoryDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 카테고리 수정      -> O
    @PutMapping("/update")
    public ResponseEntity update(@RequestBody CategoryDTO.UpdateCategoryDTO updateCategoryDTO)
    {
        ResponseMessage responseMessage = categoryService.update(updateCategoryDTO);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 카테고리 삭제      -> O
    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable(name = "id") Long categoryId)
    {
        ResponseMessage responseMessage = categoryService.delete(categoryId);

        return ResponseEntity
                .status(responseMessage.getStatus())
                .body(responseMessage);
    }

    // 카테고리 조회      -> O
    @GetMapping("")
    public ResponseEntity read()
    {
        ResponseData responseData = categoryService.readCategories();

        return ResponseEntity
                .status(responseData.getStatus())
                .body(responseData);
    }

}
