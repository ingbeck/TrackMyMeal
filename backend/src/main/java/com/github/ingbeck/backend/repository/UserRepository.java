package com.github.ingbeck.backend.repository;

import com.github.ingbeck.backend.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<AppUser, String> {
}
