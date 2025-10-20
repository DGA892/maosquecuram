package com.maosquecuram.crud.config;

import com.maosquecuram.crud.security.AuthInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/api/protegido/**") // ou o que for sua área protegida
                .excludePathPatterns(
                        "/api/usuarios/registrar",
                        "/api/usuarios/login",
                        "/auth/**",
                        "/error",
                        "/favicon.ico"
                );
    }
}
