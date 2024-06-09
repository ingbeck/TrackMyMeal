package com.github.ingbeck.backend.repository;

import com.github.ingbeck.backend.model.meal.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends MongoRepository<Meal, String> {
}
