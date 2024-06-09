package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.meal.Meal;
import com.github.ingbeck.backend.model.meal.MealItem;
import com.github.ingbeck.backend.model.meal.MealToSaveDto;
import com.github.ingbeck.backend.repository.MealRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

class MealServiceTest {

    private final MealRepository mealRepository = mock(MealRepository.class);
    private final MealService mealService = new MealService(mealRepository);

    List<Meal> listToExpect = List.of(
            new Meal("1", "2","Brot", 100, List.of(
                    new MealItem("3", "Brot", 100, "g", 250, 250)
            )));

    MealToSaveDto mealToSave = new MealToSaveDto("Porridge",
            List.of(
                    new MealItem("11", "Hafer", 40, "g", 100, 250),
                    new MealItem("12", "Milch", 200, "ml", 240, 120)));

    Meal mealToExpect = new Meal("2", "2", mealToSave.name(), 340, mealToSave.mealItems());

    @Test
    void getMeals_whenCalledInitially_returnEmptyList(){
        //GIVEN
        List<Meal> expected = List.of();
        when(mealRepository.findAll()).thenReturn(List.of());

        //WHEN
        List<Meal> actual = mealService.getMeals();

        //THEN
        assertEquals(expected, actual);

    }

    @Test
    void getMeals_whenCalled_returnMeals(){
        //GIVEN
        when(mealRepository.findAll()).thenReturn(listToExpect);

        //WHEN
        List<Meal> actual = mealService.getMeals();

        //THEN
        assertEquals(listToExpect, actual);
    }

    @Test
    void getMealsByUserId_whenCalledWithValidId_returnMealsWithIUserID(){
        //GIVEN
        when(mealRepository.findAllByUserId("2")).thenReturn(listToExpect);

        //WHEN
        List<Meal> actual = mealService.getMealsByUserId("2");

        //THEN
        assertEquals(listToExpect, actual);
    }

    @Test
    void safeNewMeal_whenCalledWithValidUserIdAndValidJSON_thenExpectMealToSafe(){
        //GIVEN
        when(mealRepository.save(any(Meal.class))).thenReturn(mealToExpect);

        //WHEN
        Meal actual = mealService.saveNewMeal("2", mealToSave);

        //THEN
        assertEquals(mealToExpect, actual);
    }

}