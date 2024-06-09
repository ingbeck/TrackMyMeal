package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.meal.Meal;
import com.github.ingbeck.backend.model.meal.MealItem;
import com.github.ingbeck.backend.repository.MealRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MealServiceTest {

    private final MealRepository mealRepository = mock(MealRepository.class);
    private final MealService mealService = new MealService(mealRepository);

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
        List<Meal> expected = List.of(
                new Meal("1", "2", 100, List.of(
                        new MealItem("3", "Brot", 100, "g", 250, 250)
                )));
        when(mealRepository.findAll()).thenReturn(expected);

        //WHEN
        List<Meal> actual = mealService.getMeals();

        //THEN
        assertEquals(expected, actual);
    }

}