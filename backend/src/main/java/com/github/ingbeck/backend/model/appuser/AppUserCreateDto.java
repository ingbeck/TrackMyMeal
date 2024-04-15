package com.github.ingbeck.backend.model.appuser;

public record AppUserCreateDto(
        String birthdate,
        AppUserGender gender,
        int height,
        int weight,
        ActivityLevel activityLevel
) {
}
