package com.github.ingbeck.backend.model.democredentials;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("demoCredentials")
public record DemoCredential(
        @Id
        String id,
        String name,
        String username,
        String password
) {
}
