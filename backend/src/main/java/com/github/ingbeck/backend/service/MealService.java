package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.meal.Meal;
import com.github.ingbeck.backend.model.meal.MealItem;
import com.github.ingbeck.backend.model.meal.MealToSaveDto;
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

    public List<Meal> getMealsByUserId(String userId){
        return mealRepository.findAllByUserId(userId);
    }

    public Meal saveNewMeal(String userId, MealToSaveDto mealToSave){
        int totalCalories = mealToSave.mealItems().stream().map(MealItem::calories).reduce(0, Integer::sum);

        return mealRepository.save(new Meal(null, userId, mealToSave.name(), totalCalories,mealToSave.mealItems()));
    }

    public void deleteMealById(String id){
        mealRepository.deleteById(id);
    }
}
