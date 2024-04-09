package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.repository.DiaryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class DiaryControllerTest {

    @Autowired
    MockMvc mvc;

    @Test
    void createNewDiary_whenCalledWithUserId_thenReturnNewDiaryWithUserId() throws Exception{
        //GIVEN
        //WHEN & THEN
        mvc.perform(post("/api/diaries/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                                    {
                                                        "userId" : "1",
                                                        "diaryEntries": []
                                                    }
                                                    """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

}