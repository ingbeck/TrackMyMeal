package com.github.ingbeck.backend.model.diary;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class DiaryEntryTest {

    @Test
    void DiaryEntry(){
        //GIVEN
        String expectedDate = "2024-04-09";
        String expectedFoodItems = "[FoodItem[name=Apple, amount=1, unit=piece, calories=140, mealType=SNACK]]";
        String expectedTotalCalories = "140";
        String expected = expectedDate+expectedFoodItems+expectedTotalCalories;

        //WHEN
        DiaryEntry newEntry = new DiaryEntry("2024-04-09",
                List.of(new FoodItem("Apple", 1, "piece", 140, MealType.SNACK)),
                140);

        //THEN
        assertEquals(expected, newEntry.date()+newEntry.foodItems()+newEntry.totalCalories());
    }
}