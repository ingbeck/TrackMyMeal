package com.github.ingbeck.backend.model.diary;

import java.time.LocalDate;
import java.util.List;

public record DiaryEntry(
        LocalDate date,
        List<FoodItem> foodItems,
        int totalCalories
) {
}
