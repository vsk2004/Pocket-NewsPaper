package com.pocket.newspaper.model;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "saved_articles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(length = 1000)
    private String imageUrl;

    @Column(nullable = false, unique = true, length = 1000)
    private String articleUrl;
    
    @Column(length = 200)
    private String author;

    @Column(length = 100)
    private String source;

    private LocalDateTime publishedAt;
    
    private LocalDateTime savedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}