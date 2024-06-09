package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.meal.Meal;
import com.github.ingbeck.backend.service.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;

    @GetMapping
    public List<Meal> getAllMeals(){
        return mealService.getMeals();
    }
}
