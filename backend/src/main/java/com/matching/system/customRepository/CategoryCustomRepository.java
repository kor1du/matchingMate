package com.matching.system.customRepository;

import com.matching.system.dto.CategoryDTO;

import java.util.List;
import java.util.Optional;

public interface CategoryCustomRepository {

    Optional<CategoryDTO> findByName(String name);

    Optional<CategoryDTO> findById(Long id);

    List<CategoryDTO> findAll();
}
