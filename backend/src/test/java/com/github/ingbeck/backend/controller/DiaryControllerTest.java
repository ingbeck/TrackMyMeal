package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.diary.Diary;
import com.github.ingbeck.backend.model.diary.DiaryEntry;
import com.github.ingbeck.backend.model.diary.FoodItem;
import com.github.ingbeck.backend.model.diary.MealType;
import com.github.ingbeck.backend.repository.DiaryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class DiaryControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    private DiaryRepository repository;

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

    @Test
    void updateDiaryEntry_whenCalledWithEmptyDiaryEntry_addNewDiaryEntry() throws Exception{
        //GIVEN
        repository.save(new Diary("1", "1", List.of()));

        //WHEN & THEN
        mvc.perform(put("/api/diaries/1/2024-04-11")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                              {
                                "name": "Kinderriegel",
                                "amount": 1,
                                "unit": "",
                                "calories": 54,
                                "mealType": "DINNER"
                              }
                         """))
                .andExpect(status().isOk())
                .andExpect(content()
                        .json("""
                                        
                                
                                                {
                                                    "date": "2024-04-11",
                                                    "foodItems": [
                                                        {
                                                            "name": "Kinderriegel",
                                                            "amount": 1,
                                                            "unit": "",
                                                            "calories": 54,
                                                            "mealType": "DINNER"
                                                        }
                                                    ],
                                                    "totalCalories": 54
                                                }
                                            
                                        """));
    }

    @Test
    void updateDiaryEntry_whenCalledWithExistingDiaryEntry_addNewDiaryEntry() throws Exception{
        //GIVEN
        FoodItem apfel = new FoodItem("Apfel", 50, "g", 140, MealType.SNACK);
        DiaryEntry existingDiaryEntry = new DiaryEntry("2024-04-11", List.of(apfel), 140);
        repository.save(new Diary("1", "1", List.of(existingDiaryEntry)));

        //WHEN & THEN
        mvc.perform(put("/api/diaries/1/2024-04-11")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                              {
                                "name": "Kinderriegel",
                                "amount": 1,
                                "unit": "",
                                "calories": 54,
                                "mealType": "DINNER"
                              }
                         """))
                .andExpect(status().isOk())
                .andExpect(content()
                        .json("""
                                        
                                
                                                {
                                                    "date": "2024-04-11",
                                                    "foodItems": [
                                                        {
                                                            "name": "Apfel",
                                                            "amount": 50,
                                                            "unit": "g",
                                                            "calories": 140,
                                                            "mealType": "SNACK"
                                                        },
                                                        {
                                                            "name": "Kinderriegel",
                                                            "amount": 1,
                                                            "unit": "",
                                                            "calories": 54,
                                                            "mealType": "DINNER"
                                                        }
                                                    ],
                                                    "totalCalories": 194
                                                }
                                            
                                        """));
    }


}