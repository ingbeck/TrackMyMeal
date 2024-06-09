package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.meal.Meal;
import com.github.ingbeck.backend.model.meal.MealToSaveDto;
import com.github.ingbeck.backend.service.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{userId}")
    public List<Meal> getAllByUserId(@PathVariable String userId){
        return mealService.getMealsByUserId(userId);
    }

    @PostMapping("/{userId}")
    public Meal createNewMeal(@PathVariable String userId, @RequestBody MealToSaveDto mealToSave){
        return mealService.saveNewMeal(userId, mealToSave);
    }
}
