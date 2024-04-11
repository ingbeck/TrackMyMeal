package com.github.ingbeck.backend.model.diary;
import lombok.With;

import java.util.List;

@With
public record DiaryEntry(
        String date,
        List<FoodItem> foodItems,
        int totalCalories
) {
}
