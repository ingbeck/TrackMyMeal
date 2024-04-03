package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.service.CurrentUrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/currentUrl")
public class CurrentUrlController {

    private final CurrentUrlService currentUrlService;

    @GetMapping
    public String getCurrentUrl(){
        return currentUrlService.getAppUrl();
    }
}
