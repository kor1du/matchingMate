package com.matching.system.repository;

import com.matching.system.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);

    Optional<Category> findByNameAndImgAddress(String name, String imgAddress);
}
