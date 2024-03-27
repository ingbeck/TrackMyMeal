package com.github.ingbeck.backend.model;

import com.nimbusds.openid.connect.sdk.claims.Gender;

public record AppUserCreateDto(
        int age,
        AppUserGender gender,
        int height,
        int weight,
        ActivityLevel activityLevel
) {
}
