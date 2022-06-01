package com.matching.system.customRepository;

import com.matching.system.domain.QCategory;
import com.matching.system.dto.CategoryDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CategoryCustomRepositoryImpl implements CategoryCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<CategoryDTO.ReadCategoryNameDTO> readCategoryName() {
        QCategory qCategory = QCategory.category;

        return jpaQueryFactory.select(Projections.fields(CategoryDTO.ReadCategoryNameDTO.class,
                        qCategory.name
                ))
                .from(qCategory)
                .orderBy(qCategory.id.asc())
                .fetch();

    }
}
