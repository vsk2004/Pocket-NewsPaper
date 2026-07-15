package com.pocket.newspaper.dto;

import lombok.Data;

@Data
public class GNewsArticle {

    private String title;

    private String description;

    private String content;

    private String url;

    private String image;

    private String publishedAt;

    private Source source;

    @Data
    public static class Source {

        private String name;

        private String url;

    }

}