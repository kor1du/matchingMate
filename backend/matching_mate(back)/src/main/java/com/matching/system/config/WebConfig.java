package com.matching.system.config;

import com.matching.system.domain.StringToEnumConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.HttpMethod;
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
                        "http://localhost:8050",
                        "http://localhost:3000",
                        "http://kor1du.gonetis.com:3000/",
                        "https://6c74-117-20-199-47.ngrok.io",
                        "https://sprotsmate.netlify.app"
                )
                .allowedMethods(HttpMethod.GET.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.HEAD.name())
        ;
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToEnumConverter());
    }
}