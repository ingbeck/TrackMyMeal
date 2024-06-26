package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.appuser.ActivityLevel;
import com.github.ingbeck.backend.model.appuser.AppUser;
import com.github.ingbeck.backend.model.appuser.AppUserGender;
import com.github.ingbeck.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class UserControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    void getUser_whenCalledWithValidId_thenReturnMaxMustermann() throws Exception{
        //GIVEN
        AppUser appUser = new AppUser(
                "1",
                "Max Mustermann",
                "1991-06-14",
                32,
                "https://example.com/mustermax.jpg",
                AppUserGender.MALE,
                180,
                90,
                ActivityLevel.COUCHPOTATO,
                1988,
                2385,
                false
        );
        userRepository.save(appUser);

        //WHEN & THEN
        mvc.perform(get("/api/users/1"))
                .andExpect(content()
                        .json("""
                                        {
                                            "id": "1",
                                            "name": "Max Mustermann",
                                            "birthdate": "1991-06-14",
                                            "age": 32,
                                            "avatarUrl": "https://example.com/mustermax.jpg",
                                            "gender": "MALE",
                                            "height": 180,
                                            "weight": 90,
                                            "activityLevel": "COUCHPOTATO",
                                            "bmr": 1988,
                                            "bmrWithActivity": 2385,
                                            "newUser": false
                                        }
                                        """));
    }

    @Test
    void testGetMe_withLoggedInUser_expectUser() throws Exception {
        //GIVEN
        //WHEN & THEN
        mvc.perform(get("/api/users/me")
                        .with(oidcLogin().userInfoToken(token -> {
                            token.claim("sub", "987654321");
                            token.claim("name", "Max Mustermann");
                            token.claim("picture", "https://example.com/mustermax.jpg");})))
                .andExpect(status().isOk());
    }

    @Test
    void whenCalledWithValidIdAndValidJSON_thenReturnNewUser() throws Exception {
        //GIVEN
        AppUser appUser = new AppUser(
                "1",
                "Max Mustermann",
                "1991-06-14",
                0,
                "https://example.com/mustermax.jpg",
                null,
                0,
                0,
                null,
                0,
                0,
                false
        );
        userRepository.save(appUser);

        //WHEN & THEN
        mvc.perform(put("/api/users/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "birthdate": "1991-06-14",
                          "gender" : "MALE",
                          "height": 180,
                          "weight": 90,
                          "activityLevel" : "COUCHPOTATO"
                        }
                        """))
                .andExpect(status().isOk())
                .andExpect(content()
                        .json("""
                                        {
                                            "id": "1",
                                            "name": "Max Mustermann",
                                            "birthdate": "1991-06-14",
                                            "age": 32,
                                            "avatarUrl": "https://example.com/mustermax.jpg",
                                            "gender": "MALE",
                                            "height": 180,
                                            "weight": 90,
                                            "activityLevel": "COUCHPOTATO",
                                            "bmr": 1988,
                                            "bmrWithActivity": 2385,
                                            "newUser": false
                                        }
                                        """));
    }

}