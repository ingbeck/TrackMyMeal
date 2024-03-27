package com.github.ingbeck.backend.model;

import com.nimbusds.openid.connect.sdk.claims.Gender;

public record AppUserCreateDto(
        String birthdate,
        AppUserGender gender,
        int height,
        int weight,
        ActivityLevel activityLevel
) {
}
