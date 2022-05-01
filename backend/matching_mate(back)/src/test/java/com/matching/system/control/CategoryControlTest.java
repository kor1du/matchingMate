package com.matching.system.control;

import com.matching.system.domain.Category;
import com.matching.system.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CategoryControlTest {
    @Autowired private CategoryRepository categoryRepository;

    @Test
    void createCategory()
    {
        Category newCategory = new Category();
        newCategory.setName("야구");
        newCategory.setImgAddress("C\\baseball");

        categoryRepository.save(newCategory);
    }
}