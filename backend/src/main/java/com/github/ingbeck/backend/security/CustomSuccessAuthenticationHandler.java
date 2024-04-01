package com.github.ingbeck.backend.security;

import com.github.ingbeck.backend.model.AppUser;
import com.github.ingbeck.backend.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CustomSuccessAuthenticationHandler implements AuthenticationSuccessHandler {

    @Value("${app.url}")
    private String appURL;

    private final UserRepository userRepository;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var principle = (OAuth2User)authentication.getPrincipal();
        String id = principle.getAttributes().get("sub").toString();
        AppUser appUser = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User with id:" + id + " not found!"));

        if(!appUser.isNewUser()){
            response.sendRedirect(appURL + "/home");
        }else{
            appUser.setNewUser(false);
            userRepository.save(appUser);
            response.sendRedirect(appURL + "/registration/" + id);
        }
    }
}
