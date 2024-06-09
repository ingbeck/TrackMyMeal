package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.meal.Meal;
import com.github.ingbeck.backend.model.meal.MealItem;
import com.github.ingbeck.backend.repository.MealRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class MealControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    private MealRepository mealRepository;

    Meal mealToSave = new Meal("1", "2", "Brot",100, List.of(
                    new MealItem("3", "Brot", 100, "g", 250, 250)));


    @Test
    void getAllMeals_whenCalledInitially_thenReturnEmptyList() throws Exception{
        //GIVEN
        //WHEN & THEN
        mvc.perform(get("/api/meals"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void getAllByUserId_whenCalledWithValidUserId_thenReturnMealsWithUserId() throws Exception{
        //GIVEN
        mealRepository.save(mealToSave);
        //WHEN & THEN
        mvc.perform(get("/api/meals/2"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                                    [
                                                        {
                                                            "id": "1",
                                                            "userId": "2",
                                                            "name": "Brot",
                                                            "totalCalories": 100,
                                                            "mealItems": [
                                                                {
                                                                    "id": "3",
                                                                    "name": "Brot",
                                                                    "amount": 100,
                                                                    "unit": "g",
                                                                    "calories": 250,
                                                                    "energyKcal100": 250
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                    """));
    }
}