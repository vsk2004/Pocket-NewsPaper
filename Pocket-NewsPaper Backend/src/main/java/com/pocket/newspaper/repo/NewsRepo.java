package com.pocket.newspaper.repo;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.pocket.newspaper.model.News;

public interface NewsRepo extends JpaRepository<News, Long> {

    boolean existsByArticleId(String articleId);

    Page<News> findByCountryAndCategoryOrderByPublishedAtDesc(
            String country,
            String category,
            Pageable pageable
    );

    Page<News> findByNewsDateOrderByPublishedAtDesc(
            LocalDate date,
            Pageable pageable
    );

    Page<News> findByNewsDateAndCategoryOrderByPublishedAtDesc(
            LocalDate date,
            String category,
            Pageable pageable
    );

    Page<News> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrSourceContainingIgnoreCaseOrderByPublishedAtDesc(
        String title,
        String description,
        String source,
        Pageable pageable
    );
}