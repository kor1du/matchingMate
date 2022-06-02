package com.matching.system.customRepository;

import com.matching.system.dto.CategoryDTO;

import java.util.List;

public interface CategoryCustomRepository {

    List<CategoryDTO.ReadCategoryNameDTO> readCategoryName();
}
