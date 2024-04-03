package com.github.ingbeck.backend.controller;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
@AutoConfigureMockMvc
class CurrentUrlControllerTest {

    @Autowired
    MockMvc mvc;

    @Test
    void getCurrentUrl_whenCalled_returnCurrentUrl() throws Exception {
        //GIVEN
        //WHEN & THEN
        mvc.perform(get("/api/currentUrl"))
                .andExpect(content().string("https://localhost:5173"));
    }

}