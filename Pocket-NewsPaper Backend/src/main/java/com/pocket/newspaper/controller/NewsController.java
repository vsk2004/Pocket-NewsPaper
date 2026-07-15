package com.pocket.newspaper.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pocket.newspaper.dto.GNewsResponse;
import com.pocket.newspaper.model.News;
import com.pocket.newspaper.service.NewsService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping("/all")
    public ResponseEntity<GNewsResponse> getAllNews(

            @RequestParam String country,
            @RequestParam String category,
            @RequestParam(required = false) String page) {

        return ResponseEntity.ok(
                newsService.getNews(country, category, page)
        );
    }

    @GetMapping("/db")
    public ResponseEntity<Page<News>> getNewsFromDatabase(

            @RequestParam String country,
            @RequestParam String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(
                newsService.getNewsFromDatabase(
                        country,
                        category,
                        page,
                        size
                )
        );
    }

    @GetMapping("/history")
    public ResponseEntity<Page<News>> getNewsHistory(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date,

            @RequestParam(defaultValue = "all")
            String category,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size) {

        return ResponseEntity.ok(

                newsService.getNewsHistory(
                        date,
                        category,
                        page,
                        size
                )
        );
    }
    @GetMapping("/search")
    public ResponseEntity<Page<News>> searchNews(

                @RequestParam String keyword,

                 @RequestParam(defaultValue="0")
                 int page,

                 @RequestParam(defaultValue="10")
                int size
                ){

                return ResponseEntity.ok(

                        newsService.searchNews(
                                         keyword,
                                         page,
                                         size
                                )
                         );
        }
}