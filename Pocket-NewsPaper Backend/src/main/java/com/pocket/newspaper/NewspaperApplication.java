package com.pocket.newspaper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class NewspaperApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewspaperApplication.class, args);
		System.out.println("Pocket-Newspaper application started successfully!");
	}

}
