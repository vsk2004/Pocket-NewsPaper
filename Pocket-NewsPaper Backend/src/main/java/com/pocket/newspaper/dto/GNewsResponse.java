package com.pocket.newspaper.dto;

import java.util.List;

import lombok.Data;

@Data
public class GNewsResponse {

    private int totalArticles;

    private List<GNewsArticle> articles;

}