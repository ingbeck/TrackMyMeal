package com.github.ingbeck.backend.repository;

import com.github.ingbeck.backend.model.meal.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends MongoRepository<Meal, String> {

    List<Meal> findAllByUserId(String userId);
}
