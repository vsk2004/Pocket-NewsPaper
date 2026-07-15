package com.pocket.newspaper.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pocket.newspaper.model.SavedArticle;
import com.pocket.newspaper.model.User;

public interface SavedArticlesRepo extends JpaRepository<SavedArticle, Long> {

    List<SavedArticle> findByUserOrderBySavedAtDesc(User user);

    Optional<SavedArticle> findByIdAndUser(Long id, User user);
    Optional<SavedArticle> findByArticleUrlAndUser(String articleUrl, User user);
}