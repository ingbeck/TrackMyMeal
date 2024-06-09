package com.github.ingbeck.backend.model.meal;

import java.util.List;

public record MealToSaveDto(
        String name,
        List<MealItem> mealItems
) {
}
