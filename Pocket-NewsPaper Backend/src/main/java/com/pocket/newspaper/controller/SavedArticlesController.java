package com.pocket.newspaper.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pocket.newspaper.model.SavedArticle;
import com.pocket.newspaper.service.SavedArticlesService;
@RestController
@RequestMapping("/api/saved-articles")
public class SavedArticlesController {
 
    @Autowired
    private SavedArticlesService savedArticlesService;

    @PostMapping("/save")
    public ResponseEntity<SavedArticle> saveArticle(@RequestBody SavedArticle article)
    {
        return ResponseEntity.ok(savedArticlesService.saveArticle(article));
    }
    @GetMapping("/all")
    public ResponseEntity<List<SavedArticle>> getAllSavedArticles() {

            return ResponseEntity.ok(
                         savedArticlesService.getAllSavedArticles()
         );
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable Long id) {
        savedArticlesService.deleteArticle(id);
        return ResponseEntity.ok("Article deleted successfully");               
    }


}
