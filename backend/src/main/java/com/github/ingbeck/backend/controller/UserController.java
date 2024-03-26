package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.AppUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/me")
        public AppUser getMe(@AuthenticationPrincipal OAuth2User user) {
            return new AppUser(user.getAttributes());
    }
}
