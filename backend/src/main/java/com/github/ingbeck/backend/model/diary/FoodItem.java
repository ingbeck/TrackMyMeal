package com.github.ingbeck.backend.model.diary;

public record FoodItem(
        String name,
        int amount,
        String unit,
        int calories,
        MealType mealType
) {
}
