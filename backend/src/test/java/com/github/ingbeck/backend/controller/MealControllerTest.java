package com.github.ingbeck.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class MealControllerTest {

    @Autowired
    MockMvc mvc;

    @Test
    void getAllMeals_whenCalledInitially_thenReturnEmptyList() throws Exception{
        //GIVEN
        //WHEN & THEN
        mvc.perform(get("/api/meals"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}