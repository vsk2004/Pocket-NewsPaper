package com.pocket.newspaper.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.pocket.newspaper.model.SavedArticle;
import com.pocket.newspaper.model.User;
import com.pocket.newspaper.repo.SavedArticlesRepo;
import com.pocket.newspaper.repo.UserRepo;

@Service
public class SavedArticlesService {
    @Autowired
    private SavedArticlesRepo savedArticlesRepo;

    @Autowired
    private UserRepo userRepo;

 public SavedArticle saveArticle(SavedArticle article) {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    User user = userRepo.findByEmail(email)
            .orElseThrow();

    Optional<SavedArticle> existingArticle =
            savedArticlesRepo.findByArticleUrlAndUser(article.getArticleUrl(), user);

    if(existingArticle.isPresent()){
        throw new RuntimeException("Article already saved");
    }

    article.setUser(user);

    article.setSavedAt(LocalDateTime.now());

    return savedArticlesRepo.save(article);
}

   public List<SavedArticle> getAllSavedArticles() {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    User user = userRepo.findByEmail(email)
            .orElseThrow();

    return savedArticlesRepo.findByUserOrderBySavedAtDesc(user);
    }

   public void deleteArticle(Long id) {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    User user = userRepo.findByEmail(email)
            .orElseThrow();

    SavedArticle article = savedArticlesRepo
            .findByIdAndUser(id, user)
            .orElseThrow(() ->
                    new RuntimeException("Article not found"));

    savedArticlesRepo.delete(article);
    }
}
