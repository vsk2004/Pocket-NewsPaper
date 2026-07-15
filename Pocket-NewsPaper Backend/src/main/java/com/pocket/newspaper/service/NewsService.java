package com.pocket.newspaper.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.pocket.newspaper.dto.GNewsArticle;
import com.pocket.newspaper.dto.GNewsResponse;
import com.pocket.newspaper.model.News;
import com.pocket.newspaper.repo.NewsRepo;

@Service
public class NewsService {

    private static final String NO_TITLE = "No Title";
    private static final String UNKNOWN_AUTHOR = "Unknown";
    private static final String EMPTY = "";

    @Autowired
    private NewsRepo newsRepo;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${news.api.key}")
    private String apiKey;

    @Value("${news.api.url}")
    private String apiUrl;

    public GNewsResponse getNews(String country, String category, String page) {

        String url = buildApiUrl(country, category, page);

        GNewsResponse response =
                restTemplate.getForObject(url, GNewsResponse.class);

        saveArticles(response, country, category);

        return response;
    }

    public Page<News> getNewsFromDatabase(
            String country,
            String category,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        return newsRepo.findByCountryAndCategoryOrderByPublishedAtDesc(
                country,
                category,
                pageable
        );
    }

    public Page<News> getNewsHistory(
            LocalDate date,
            String category,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        if (category == null || category.equalsIgnoreCase("all")) {

            return newsRepo.findByNewsDateOrderByPublishedAtDesc(
                    date,
                    pageable
            );
        }

        return newsRepo.findByNewsDateAndCategoryOrderByPublishedAtDesc(
                date,
                category,
                pageable
        );
    }

    private String buildApiUrl(
            String country,
            String category,
            String page) {

        String url =
                apiUrl
                        + "?token=" + apiKey
                        + "&country=" + country
                        + "&category=" + category
                        + "&lang=en"
                        + "&max=10";

        if (page != null && !page.isEmpty()) {
            url += "&page=" + page;
        }

        return url;
    }

    private void saveArticles(
            GNewsResponse response,
            String country,
            String category) {

        if (response == null || response.getArticles() == null) {
            return;
        }

        for (GNewsArticle article : response.getArticles()) {

            String articleId = generateArticleId(article.getUrl());

            if (newsRepo.existsByArticleId(articleId)) {
                continue;
            }

            News news =
                    convertToNews(
                            article,
                            articleId,
                            country,
                            category
                    );

            newsRepo.save(news);
        }
    }

    private News convertToNews(
            GNewsArticle article,
            String articleId,
            String country,
            String category) {

        News news = new News();

        news.setArticleId(articleId);

        news.setTitle(
                article.getTitle() != null
                        ? article.getTitle()
                        : NO_TITLE
        );

        news.setDescription(
                article.getDescription() != null
                        ? article.getDescription()
                        : EMPTY
        );

        if (article.getImage() != null &&
                !article.getImage().isBlank()) {

            news.setImageUrl(article.getImage());

        } else {

            news.setImageUrl(EMPTY);

        }

        news.setArticleUrl(article.getUrl());

        if (article.getSource() != null) {

            news.setSource(article.getSource().getName());

        } else {

            news.setSource("Unknown");

        }

        news.setLanguage("en");

        news.setAuthor(UNKNOWN_AUTHOR);

        news.setCountry(country);

        news.setCategory(category.trim());

        news.setPublishedAt(
                parsePublishedDate(article.getPublishedAt())
        );

        news.setNewsDate(LocalDate.now());

        return news;
    }

    private LocalDateTime parsePublishedDate(String publishedAt) {

        try {

            return OffsetDateTime
                    .parse(publishedAt)
                    .toLocalDateTime();

        } catch (Exception e) {

            return LocalDateTime.now();

        }

    }

    private String generateArticleId(String url) {

        try {

            MessageDigest md =
                    MessageDigest.getInstance("MD5");

            byte[] digest =
                    md.digest(
                            url.getBytes(StandardCharsets.UTF_8)
                    );

            StringBuilder sb =
                    new StringBuilder();

            for (byte b : digest) {

                sb.append(
                        String.format("%02x", b)
                );

            }

            return sb.toString();

        } catch (Exception e) {

            return String.valueOf(url.hashCode());

        }

    }
    public Page<News> searchNews(
        String keyword,
        int page,
        int size
    ){
             Pageable pageable = PageRequest.of(page,size);

             return newsRepo
                              .findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrSourceContainingIgnoreCaseOrderByPublishedAtDesc(
                              keyword,
                              keyword,
                              keyword,
                              pageable
        );
    }

}