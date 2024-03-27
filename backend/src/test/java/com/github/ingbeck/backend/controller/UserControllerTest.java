package com.github.ingbeck.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    MockMvc mvc;

    @Test
    void testGetMe_withLoggedInUser_expectUser() throws Exception {
        mvc.perform(get("/api/users/me")
                        .with(oidcLogin().userInfoToken(token -> {
                            token.claim("sub", "987654321");
                            token.claim("name", "Max Mustermann");
                            token.claim("picture", "https://example.com/mustermax.jpg");})))
                .andExpect(status().isOk());
    }

}