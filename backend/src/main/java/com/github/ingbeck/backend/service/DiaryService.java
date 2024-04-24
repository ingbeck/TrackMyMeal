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

    public DiaryEntry updateDiaryEntry(String userId, String date, FoodItem newFoodItem){
        Diary diaryToUpdate = getDiaryByUserId(userId);
        List<DiaryEntry> currentDiaryEntries = diaryToUpdate.diaryEntries();

        List<DiaryEntry> newDiaryEntries;
        int totalCalories;

        try{
            DiaryEntry diaryEntryToUpdate = getDiaryEntryByDate(userId,date);
            List<FoodItem> updatedFoodItems = diaryEntryToUpdate.foodItems();
            updatedFoodItems.add(newFoodItem);

            totalCalories = updatedFoodItems.stream().map(FoodItem::calories).reduce(0, Integer::sum);

            DiaryEntry updatedDiaryEntry = diaryEntryToUpdate.withFoodItems(updatedFoodItems).withTotalCalories(totalCalories);
            newDiaryEntries = currentDiaryEntries.stream().map(entry -> entry.date().equals(date) ? updatedDiaryEntry : entry).toList();

            diaryRepository.save(getDiaryByUserId(userId).withDiaryEntries(newDiaryEntries));

        }catch (NoSuchElementException e){
            totalCalories = newFoodItem.calories();
            currentDiaryEntries.add(new DiaryEntry(date, List.of(newFoodItem), totalCalories));

            diaryRepository.save(getDiaryByUserId(userId).withDiaryEntries(currentDiaryEntries));

        }

        return getDiaryEntryByDate(userId, date);

    }

    public DiaryEntry deleteFoodItem(String userId, String date, FoodItem foodItemToDelete){
        Diary diaryToUpdate = getDiaryByUserId(userId);
        List<DiaryEntry> currentDiaryEntries = diaryToUpdate.diaryEntries();
        List<DiaryEntry> newDiaryEntries;

        DiaryEntry diaryEntryToUpdate = getDiaryEntryByDate(userId, date);
        List<FoodItem> updatedFoodItems = diaryEntryToUpdate.foodItems();
        updatedFoodItems.remove(foodItemToDelete);

        if(updatedFoodItems.isEmpty()){
            newDiaryEntries = currentDiaryEntries.stream().filter(entry -> !entry.date().equals(date)).toList();
            diaryRepository.save(getDiaryByUserId(userId).withDiaryEntries(newDiaryEntries));
            return null;
        }else{
            int totalCalories = updatedFoodItems.stream().map(FoodItem::calories).reduce(0, Integer::sum);
            DiaryEntry updatedDiaryEntry = diaryEntryToUpdate.withFoodItems(updatedFoodItems).withTotalCalories(totalCalories);
            newDiaryEntries = currentDiaryEntries.stream().map(entry -> entry.date().equals(date) ? updatedDiaryEntry : entry).toList();

            diaryRepository.save(getDiaryByUserId(userId).withDiaryEntries(newDiaryEntries));

            return getDiaryEntryByDate(userId, date);
        }

    }

    public void deleteDiaryByUserId(String userId){
        diaryRepository.delete(diaryRepository.findDiaryByUserId(userId));
    }
}
