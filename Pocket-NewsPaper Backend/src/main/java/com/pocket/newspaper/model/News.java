package com.pocket.newspaper.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "news")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   
    @Column(unique = true, nullable = false, length = 100)
    private String articleId;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(length = 1000)
    private String imageUrl;

    @Column(nullable = false, length = 1000)
    private String articleUrl;

    @Column(length = 200)
    private String author;

    @Column(length = 200)
    private String source;

    @Column(length = 100)
    private String category;

    @Column(length = 50)
    private String country;

    @Column(length = 20)
    private String language;

    
    private LocalDateTime publishedAt;

    
    private LocalDate newsDate;
}