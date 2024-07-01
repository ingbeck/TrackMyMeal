package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.diary.Diary;
import com.github.ingbeck.backend.model.diary.DiaryEntry;
import com.github.ingbeck.backend.model.diary.MealType;
import com.github.ingbeck.backend.model.meal.Meal;
import com.github.ingbeck.backend.model.meal.MealItem;
import com.github.ingbeck.backend.model.meal.MealToSaveDto;
import com.github.ingbeck.backend.repository.DiaryRepository;
import com.github.ingbeck.backend.repository.MealRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MealServiceTest {

    private final MealRepository mealRepository = mock(MealRepository.class);
    final DiaryRepository diaryRepository = mock(DiaryRepository.class);
    private final MealService mealService = new MealService(mealRepository, new DiaryService(diaryRepository));

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

    @Test
    void deleteMealById_whenCalledWithValidId_verifyRepoDelete(){
        //GIVEN
        //THEN
        mealService.deleteMealById("2");

        //
        verify(mealRepository).deleteById("2");
    }

    @Test
    void addMealToDiary_whenCalledWithValidParameters_addMealItemsToDiary(){
        //GIVEN
        MealToSaveDto mealToAdd = new MealToSaveDto("Butterbrot", List.of(
                new MealItem("1", "Brot", 80, "g", 80, 100),
                new MealItem("1", "Butter", 20, "g", 80, 100)));

        when(diaryRepository.findDiaryByUserId("1")).thenReturn(new Diary(
                "2",
                "1",
                List.of(new DiaryEntry("2024-01-01", new ArrayList<>(List.of()), 0))
        ));
        //WHEN
        mealService.addMealToDiary("1", "2024-01-01", mealToAdd, MealType.DINNER);

        //THEN
        verify(diaryRepository, times(8)).findDiaryByUserId("1");
    }

}