package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.diary.*;
import com.github.ingbeck.backend.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    public Diary getDiaryByUserId(String userId){
        return diaryRepository.findDiaryByUserId(userId);
    }
    public Diary createNewDiary(String userId){
        List<DiaryEntry> emptyDiaryEntries = new ArrayList<>();

        return diaryRepository.save(new Diary(null, userId, emptyDiaryEntries));
    }

    public DiaryEntry getDiaryEntryByDate(String userId, String date){
        return diaryRepository.findDiaryByUserId(userId).diaryEntries()
                .stream().filter(diaryEntry -> diaryEntry.date().equals(date))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Für diesen Tag gibt es keine Einträge!"));
    }


    public Diary updateDiaryEntry(String userId, String date, List<FoodItem> newFoodItems){
        Diary diaryToUpdate = getDiaryByUserId(userId);
        List<DiaryEntry> currentDiaryEntries = diaryToUpdate.diaryEntries();


        List<DiaryEntry> newDiaryEntries;
        int totalCalories;

        try{
            DiaryEntry diaryEntryToUpdate = getDiaryEntryByDate(userId,date);
            List<FoodItem> updatedFoodItems = diaryEntryToUpdate.foodItems();
            updatedFoodItems.addAll(newFoodItems);
            totalCalories = updatedFoodItems.stream().map(FoodItem::calories).reduce(0, Integer::sum);
            DiaryEntry updatedDiaryEntry = diaryEntryToUpdate.withFoodItems(updatedFoodItems).withTotalCalories(totalCalories);
            newDiaryEntries = currentDiaryEntries.stream().map(entry -> entry.date().equals(date) ? updatedDiaryEntry : entry).toList();

        }catch (NoSuchElementException e){
            totalCalories = newFoodItems.stream().map(FoodItem::calories).reduce(0, Integer::sum);
            newDiaryEntries = List.of(new DiaryEntry(date, newFoodItems, totalCalories));

        }

        return diaryRepository.save(getDiaryByUserId(userId).withDiaryEntries(newDiaryEntries));
    }

}
