package com.github.ingbeck.backend.model.diary;
import java.util.List;

public record DiaryEntry(
        String date,
        List<FoodItem> foodItems,
        int totalCalories
) {
}
