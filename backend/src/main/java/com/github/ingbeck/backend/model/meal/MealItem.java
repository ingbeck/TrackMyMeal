package com.github.ingbeck.backend.model.meal;

public record MealItem(
        String id,
        String name,
        int amount,
        String unit,
        int calories,
        int energyKcal100
) {
}
