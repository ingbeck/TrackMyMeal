package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.democredentials.DemoCredentialDto;
import com.github.ingbeck.backend.service.DemoCredentialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/demo")
public class DemoCredentialController {

    private final DemoCredentialService demoCredentialService;

    @PostMapping("/login")
    public boolean isAuthorized(@RequestBody DemoCredentialDto credentialDto){
        return demoCredentialService.isAuthorized(credentialDto);
    }
}
