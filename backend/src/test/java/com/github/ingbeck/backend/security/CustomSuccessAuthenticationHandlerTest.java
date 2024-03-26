package com.github.ingbeck.backend.security;

import com.github.ingbeck.backend.model.AppUser;
import com.github.ingbeck.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CustomSuccessAuthenticationHandlerTest {

    @Mock
    private HttpServletRequest request;
    @Mock
    private HttpServletResponse response;
    @Mock
    private Authentication authentication;
    @Mock
    private OAuth2User oAuth2User;
    @Mock
    private UserRepository userRepository;

    @Test
    void testOnAuthenticationSuccessWhenUserIsNew() throws Exception {
        try (AutoCloseable ignored = MockitoAnnotations.openMocks(this)) {

            CustomSuccessAuthenticationHandler customAuthenticationHandler = new CustomSuccessAuthenticationHandler(userRepository);


            Map<String, Object> attributes = new HashMap<>();
            attributes.put("sub", "987654321");
            attributes.put("name", "Max Mustermann");
            attributes.put("birthdate", "1991-14-07");
            attributes.put("picture", "https://example.com/mustermax.jpg");
            attributes.put("gender", null);
            attributes.put("height", 0);
            attributes.put("weight", 0);
            attributes.put("activityLevel", null);
            attributes.put("isNewUser", false);
            when(authentication.getPrincipal()).thenReturn(oAuth2User);
            when(oAuth2User.getAttributes()).thenReturn(attributes);

            AppUser user = new AppUser(
                    "987654321",
                    "Max Mustermann",
                    "1991-14-07",
                    "https://example.com/mustermax.jpg",
                    null,
                    0,
                    0,
                    null,
                    true
            );

            when(userRepository.findById("987654321")).thenReturn(Optional.of(user));

            customAuthenticationHandler.onAuthenticationSuccess(request, response, authentication);

            verify(response).sendRedirect(anyString());
            ArgumentCaptor<AppUser> userCaptor = ArgumentCaptor.forClass(AppUser.class);
            verify(userRepository).save(userCaptor.capture());
            AppUser savedUser = userCaptor.getValue();
            assertFalse(savedUser.isNewUser());
        }
    }

    @Test
    void testOnAuthenticationSuccessWhenUserIsNotNew() throws Exception {
        try (AutoCloseable ignored = MockitoAnnotations.openMocks(this)) {

            CustomSuccessAuthenticationHandler customAuthenticationHandler = new CustomSuccessAuthenticationHandler(userRepository);
            ReflectionTestUtils.setField(customAuthenticationHandler, "appURL", "http://localhost:5173");

            Map<String, Object> attributes = new HashMap<>();
            attributes.put("sub", "987654321");
            attributes.put("name", "Max Mustermann");
            attributes.put("birthdate", "1991-14-07");
            attributes.put("picture", "https://example.com/mustermax.jpg");
            attributes.put("gender", null);
            attributes.put("height", 0);
            attributes.put("weight", 0);
            attributes.put("activityLevel", null);
            attributes.put("isNewUser", false);
            when(authentication.getPrincipal()).thenReturn(oAuth2User);
            when(oAuth2User.getAttributes()).thenReturn(attributes);

            AppUser user = new AppUser(
                    "987654321",
                    "Max Mustermann",
                    "1991-14-07",
                    "https://example.com/mustermax.jpg",
                    null,
                    0,
                    0,
                    null,
                    true
            );

            when(userRepository.findById("987654321")).thenReturn(Optional.of(user));

            customAuthenticationHandler.onAuthenticationSuccess(request, response, authentication);

            verify(response).sendRedirect("http://localhost:5173/registration/987654321");
            ArgumentCaptor<AppUser> userCaptor = ArgumentCaptor.forClass(AppUser.class);
            verify(userRepository).save(userCaptor.capture());
            AppUser savedUser = userCaptor.getValue();
            assertFalse(savedUser.isNewUser());
        }
    }


}