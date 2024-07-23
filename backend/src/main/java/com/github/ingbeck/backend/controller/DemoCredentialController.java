package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.service.DemoCredentialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/demo")
public class DemoCredentialController {

    private final DemoCredentialService demoCredentialService;

    @GetMapping("/login/{username}/{password}")
    public boolean isAuthorized(@PathVariable String username, @PathVariable String password){
        return demoCredentialService.isAuthorized(username, password);
    }
}
