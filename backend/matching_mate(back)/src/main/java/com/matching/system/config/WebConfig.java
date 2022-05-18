package com.matching.system.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://kor1du.ddns.net:3000/",
                        "http://localhost:3000/",
                        "http://kalzake.gonetis.com:3000/",
                        "http://localhost:8080",
                        "http://localhost:3000"
                );
    }
}