package com.github.ingbeck.backend.repository;

import com.github.ingbeck.backend.model.democredentials.DemoCredential;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DemoCredentialRepository extends MongoRepository<DemoCredential, String> {
    Optional<DemoCredential> findDemoCredentialByUsername(String username);
}
