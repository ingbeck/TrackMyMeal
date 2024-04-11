package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.diary.Diary;
import com.github.ingbeck.backend.model.diary.DiaryEntry;
import com.github.ingbeck.backend.model.diary.FoodItem;
import com.github.ingbeck.backend.model.diary.MealType;
import com.github.ingbeck.backend.repository.DiaryRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class DiaryServiceTest {

    private final DiaryRepository diaryRepository = mock(DiaryRepository.class);
    private final DiaryService diaryService = new DiaryService(diaryRepository);

    @Test
    void createNewDiary_whenCalledWithUserId_returnNewDiaryWithUserId(){
        //GIVEN
        Diary expected = new Diary("123", "321", new ArrayList<>());
        when(diaryRepository.save(any(Diary.class))).thenReturn(expected);

        //WHEN
        Diary actual = diaryService.createNewDiary("321");

        //THEN
        verify(diaryRepository).save(any(Diary.class));
        assertEquals(expected,actual);
    }

    @Test
    void updateDiaryEntry_whenCalledWithEmptyDiaryEntry_addNewDiaryEntry(){
        //GIVEN
        String userId = "1";
        String date = "2024-04-11";
        List<FoodItem> newFoodItems = List.of(new FoodItem("Kinderriegel", 1, "", 54, MealType.SNACK));
        Diary expected = new Diary("1", "1", List.of(new DiaryEntry(date, newFoodItems, 54))
        );

        when(diaryRepository.findDiaryByUserId(userId)).thenReturn(new Diary("1", "1", List.of()
        ));
        when(diaryRepository.save(any(Diary.class))).thenReturn(expected);

        //WHEN
        Diary actual = diaryService.updateDiaryEntry(userId, date, newFoodItems);

        //THEN
        verify(diaryRepository).save(any(Diary.class));
        assertEquals(expected, actual);

    }

    @Test
    void updateDiaryEntry_whenCalledWithExistingDiaryEntry_updateDiaryEntry(){
        //GIVEN
        String userId = "1";
        String date = "2024-04-11";
        FoodItem kinderriegel = new FoodItem("Kinderriegel", 1, "", 54, MealType.SNACK);
        FoodItem apfel = new FoodItem("Apfel", 50, "g", 140, MealType.SNACK);
        List<FoodItem> newFoodItems = new ArrayList<>(List.of(kinderriegel));

        DiaryEntry existingDiaryEntry = new DiaryEntry(date, new ArrayList<>(List.of(apfel)), 140);
        Diary expected = new Diary("1", "1", new ArrayList<>(List.of(new DiaryEntry(date, List.of(apfel,kinderriegel), apfel.calories()+kinderriegel.calories())))
        );

        when(diaryRepository.findDiaryByUserId(userId)).thenReturn(new Diary("1", "1", new ArrayList<>(List.of(existingDiaryEntry))));
        when(diaryRepository.save(any(Diary.class))).thenReturn(expected);

        //WHEN
        Diary actual = diaryService.updateDiaryEntry(userId, date, newFoodItems);

        //THEN
        verify(diaryRepository).save(any(Diary.class));
        assertEquals(expected, actual);

    }

}