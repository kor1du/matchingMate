package com.matching.system.customRepository;

import com.matching.system.domain.QCategory;
import com.matching.system.dto.CategoryDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CategoryCustomRepositoryImpl implements CategoryCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<CategoryDTO> findByName(String name) {
        QCategory qCategory = QCategory.category;

        return Optional.ofNullable(
                jpaQueryFactory.select(Projections.fields(CategoryDTO.class,
                                qCategory.id,
                                qCategory.name,
                                qCategory.imgAddress))
                        .from(qCategory)
                        .where(qCategory.name.eq(name))
                        .fetchOne()
        );
    }

    @Override
    public Optional<CategoryDTO> findById(Long id) {
        QCategory qCategory = QCategory.category;

        return Optional.ofNullable(
                jpaQueryFactory.select(Projections.fields(CategoryDTO.class,
                                qCategory.id,
                                qCategory.name,
                                qCategory.imgAddress))
                        .from(qCategory)
                        .where(qCategory.id.eq(id))
                        .fetchOne()
        );
    }

    @Override
    public List<CategoryDTO> findAll() {
        QCategory qCategory = QCategory.category;

        return jpaQueryFactory.select(Projections.fields(CategoryDTO.class,
                                qCategory.id,
                                qCategory.name,
                                qCategory.imgAddress))
                .from(qCategory)
                .fetch();
    }
}
