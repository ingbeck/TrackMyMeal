package com.github.ingbeck.backend.model.meal;


import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("meals")
public record Meal(
        String id,
        String userId,
        String name,
        int totalCalories,
        List<MealItem> mealItems
) {
}
