package com.github.ingbeck.backend.model;

import com.nimbusds.openid.connect.sdk.claims.Gender;

public record AppUserCreateDto(
        int age,
        Gender gender,
        int height,
        int weight,
        ActivityLevel activityLevel
) {
}
