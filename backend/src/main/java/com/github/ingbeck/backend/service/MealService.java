package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.meal.Meal;
import com.github.ingbeck.backend.repository.MealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;

    public List<Meal> getMeals(){
        return mealRepository.findAll();
    }
}
