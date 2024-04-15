package com.github.ingbeck.backend.repository;

import com.github.ingbeck.backend.model.appuser.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<AppUser, String> {
}
