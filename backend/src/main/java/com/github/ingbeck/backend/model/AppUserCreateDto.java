package com.github.ingbeck.backend.model;

public record AppUserCreateDto(
        String birthdate,
        AppUserGender gender,
        int height,
        int weight,
        ActivityLevel activityLevel
) {
}
