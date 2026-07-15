package com.pocket.newspaper.schedular;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.pocket.newspaper.service.NewsService;

@Component
public class NewsScheduler {

    @Autowired
    private NewsService newsService;

    @Scheduled(cron = "0 0 * * * *")
    public void fetchLatestNews() {

       

        String[] categories = {
                "top",
                "sports",
                "business",
                "technology",
                "entertainment",
                "health",
                "science"
        };

        for (String category : categories) {

            try {
                newsService.getNews("in", category, null);
               
            } catch (Exception e) {
               
                e.printStackTrace();
            }

        }

       
    }
}