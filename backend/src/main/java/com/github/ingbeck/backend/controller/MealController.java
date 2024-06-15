package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.diary.MealType;
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

    @DeleteMapping("/{id}")
    public void deleteMealById(@PathVariable String id){
        mealService.deleteMealById(id);
    }

    @PutMapping("/{id}/{date}/{mealType}")
    public void addMealToDiary(@PathVariable String id, @PathVariable String date, @PathVariable MealType mealType, @RequestBody MealToSaveDto mealToSaveDto){
        mealService.addMealToDiary(id, date, mealToSaveDto, mealType);
    }
}
