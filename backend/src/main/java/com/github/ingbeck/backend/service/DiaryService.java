package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.diary.*;
import com.github.ingbeck.backend.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    public Diary getDiaryByUserId(String userId) {
        return diaryRepository.findDiaryByUserId(userId);
    }

    public Diary createNewDiary(String userId) {
        List<DiaryEntry> emptyDiaryEntries = new ArrayList<>();

        return diaryRepository.save(new Diary(null, userId, emptyDiaryEntries));
    }

    public DiaryEntry getDiaryEntryByDate(String userId, String date) {
        return diaryRepository.findDiaryByUserId(userId).diaryEntries()
                .stream().filter(diaryEntry -> diaryEntry.date().equals(date))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Für diesen Tag gibt es keine Einträge!"));
    }

    public DiaryEntry updateDiaryEntry(String userId, String date, FoodItem newFoodItem) {
        Diary diaryToUpdate = getDiaryByUserId(userId);
        List<DiaryEntry> currentDiaryEntries = diaryToUpdate.diaryEntries();

        List<DiaryEntry> newDiaryEntries;
        int totalCalories;

        try {
            DiaryEntry diaryEntryToUpdate = getDiaryEntryByDate(userId, date);
            List<FoodItem> updatedFoodItems = diaryEntryToUpdate.foodItems();
            updatedFoodItems.add(newFoodItem);

            totalCalories = updatedFoodItems.stream().map(FoodItem::calories).reduce(0, Integer::sum);

            DiaryEntry updatedDiaryEntry = diaryEntryToUpdate.withFoodItems(updatedFoodItems).withTotalCalories(totalCalories);
            newDiaryEntries = currentDiaryEntries.stream().map(entry -> entry.date().equals(date) ? updatedDiaryEntry : entry).toList();

            diaryRepository.save(getDiaryByUserId(userId).withDiaryEntries(newDiaryEntries));

        } catch (NoSuchElementException e) {
            totalCalories = newFoodItem.calories();
            currentDiaryEntries.add(new DiaryEntry(date, List.of(newFoodItem), totalCalories));

            diaryRepository.save(getDiaryByUserId(userId).withDiaryEntries(currentDiaryEntries));

        }

        return getDiaryEntryByDate(userId, date);

    }

    public DiaryEntry deleteFoodItem(String userId, String date, FoodItem foodItemToDelete) {
        Diary diaryToUpdate = getDiaryByUserId(userId);
        List<DiaryEntry> currentDiaryEntries = diaryToUpdate.diaryEntries();
        List<DiaryEntry> newDiaryEntries;

        DiaryEntry diaryEntryToUpdate = getDiaryEntryByDate(userId, date);
        List<FoodItem> updatedFoodItems = diaryEntryToUpdate.foodItems();
        updatedFoodItems.remove(foodItemToDelete);

        if (updatedFoodItems.isEmpty()) {
            newDiaryEntries = currentDiaryEntries.stream().filter(entry -> !entry.date().equals(date)).toList();
            diaryRepository.save(getDiaryByUserId(userId).withDiaryEntries(newDiaryEntries));
            return null;
        } else {
            int totalCalories = updatedFoodItems.stream().map(FoodItem::calories).reduce(0, Integer::sum);
            DiaryEntry updatedDiaryEntry = diaryEntryToUpdate.withFoodItems(updatedFoodItems).withTotalCalories(totalCalories);
            newDiaryEntries = currentDiaryEntries.stream().map(entry -> entry.date().equals(date) ? updatedDiaryEntry : entry).toList();

            diaryRepository.save(getDiaryByUserId(userId).withDiaryEntries(newDiaryEntries));

            return getDiaryEntryByDate(userId, date);
        }

    }

    public void deleteDiaryByUserId(String userId) {
        diaryRepository.delete(diaryRepository.findDiaryByUserId(userId));
    }

    public void createDemoDiary(String userId){

        String id = new ObjectId().toString();
        Diary diaryToSave = new Diary(id, userId, demoDiaryEntriesLastSevenDays());

        diaryRepository.save(diaryToSave);
    }

    public List<DiaryEntry> demoDiaryEntriesLastSevenDays(){

        List<DiaryEntry> diaryEntries = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for(int i = 0; i < 7; i++){
            diaryEntries.add(new DiaryEntry(
                    today.minusDays(i-1L).toString(),
                    demoFoodItems(i+1),
                    demoFoodItems(i+1).stream().map(FoodItem::calories).reduce(0, Integer::sum))
            );
        }

        return diaryEntries;
    }

    public List<FoodItem> demoFoodItems(int day){

        return switch (day) {
            case 1 -> List.of(
                    new FoodItem(new ObjectId().toString(), "Hafer Cappuccino", 230, "g", 98, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Bio Roggen Brot", 60, "g", 128, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Bio Schwarzwälder Schinken", 80, "g", 184, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Butter", 5, "g", 37, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Frische Spaghetti", 80, "g", 227, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Bolognese", 200, "g", 414, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Grieß Dessert", 175, "g", 250, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Erdbeeren", 100, "g", 42, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Kakao Drink", 200, "g", 178, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Snickers", 50, "g", 241, MealType.SNACK)
            );
            case 2 -> List.of(
                    new FoodItem(new ObjectId().toString(), "Hafer Cappuccino", 230, "g", 98, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Haferflocken", 40, "g", 148, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Alpen Milch", 200, "g", 132, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Agavendicksaft", 5, "g", 15, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Apfel Chips", 25, "g", 82, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Pizza", 370, "g", 888, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Bio Roggen Brot", 120, "g", 256, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Gouda", 40, "g", 136, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Butter", 10, "g", 74, MealType.DINNER)
            );
            case 3 -> List.of(
                    new FoodItem(new ObjectId().toString(), "Hafer Cappuccino", 230, "g", 98, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Haferflocken", 40, "g", 148, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Alpen Milch", 200, "g", 132, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Agavendicksaft", 5, "g", 15, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Beeren Mischung", 50, "g", 30, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Rotes Thai Curry", 330, "g", 396, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Bio Basmati Reis", 50, "g", 177, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Jamón Serrano", 80, "g", 177, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Feta", 100, "g", 290, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Oliven", 30, "g", 54, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Bio Linsen Chips", 80, "g", 311, MealType.SNACK)
            );
            case 4 -> List.of(
                    new FoodItem(new ObjectId().toString(), "Hafer Cappuccino", 230, "g", 98, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Bagel mit Schinken", 220, "g", 440, MealType.BREAKFAST)
            );
            case 5 -> List.of(
                    new FoodItem(new ObjectId().toString(), "Hafer Cappuccino", 230, "g", 98, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Bio Berry Bircher Müsli", 80, "g", 301, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Alpen Milch", 200, "g", 132, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Dinkel Toast", 40, "g", 106, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Butter", 10, "g", 74, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Veganer Schinken Spicker Mortadella", 24, "g", 28, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Carpaccio", 100, "g", 165, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Lasagne Bolognese", 450, "g", 603, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Tiramisu", 125, "g", 291, MealType.DINNER)
            );
            case 6 -> List.of(
                    new FoodItem(new ObjectId().toString(), "Hafer Cappuccino", 230, "g", 98, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Haferflocken", 40, "g", 148, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Alpen Milch", 200, "g", 132, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Agavendicksaft", 5, "g", 15, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Mango", 100, "g", 67, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Chickenburger", 452, "g", 940, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Pommes", 150, "g", 276, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Dinkel Toast", 40, "g", 106, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Leicht Käse", 40, "g", 112, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Butter", 5, "g", 37, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Alpen-Vollmilch-Schokolade", 80, "g", 429, MealType.SNACK)
            );
            case 7 -> List.of(
                    new FoodItem(new ObjectId().toString(), "Hafer Cappuccino", 230, "g", 98, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Bio Roggen Brot", 60, "g", 128, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Bio Schwarzwälder Schinken", 80, "g", 184, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Butter", 5, "g", 37, MealType.BREAKFAST),
                    new FoodItem(new ObjectId().toString(), "Käse Spätzle", 400, "g", 728, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Geschälte Tomaten", 100, "g", 21, MealType.DINNER),
                    new FoodItem(new ObjectId().toString(), "Bio Mozzarella", 125, "g", 275, MealType.LUNCH),
                    new FoodItem(new ObjectId().toString(), "Bananen Chips", 40, "g", 200, MealType.SNACK)
            );
            default -> List.of();
        };
    }
}