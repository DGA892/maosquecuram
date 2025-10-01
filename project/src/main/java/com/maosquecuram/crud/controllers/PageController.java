package com.maosquecuram.crud.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/users/profile")
    public String showProfilePage() {
        return "users/profile"; // Thymeleaf procura em src/main/resources/templates/users/profile.html
    }

}

