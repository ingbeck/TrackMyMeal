package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.AppUser;
import com.github.ingbeck.backend.model.AppUserCreateDto;
import com.github.ingbeck.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    public final UserService userService;

    @GetMapping("/me")
        public AppUser getMe(@AuthenticationPrincipal OAuth2User user) {
            return new AppUser(user.getAttributes());
    }

    @PutMapping("/{id}")
    public AppUser createUser(@PathVariable String id, @RequestBody AppUserCreateDto appUserCreateDto){
        return userService.createUser(id, appUserCreateDto);
    }
}
