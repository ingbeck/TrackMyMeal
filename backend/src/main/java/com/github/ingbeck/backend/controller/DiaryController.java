package com.github.ingbeck.backend.controller;
import com.github.ingbeck.backend.model.diary.Diary;
import com.github.ingbeck.backend.model.diary.FoodItem;
import com.github.ingbeck.backend.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/diaries")
public class DiaryController {

    private final DiaryService diaryService;

    @PostMapping("/{id}")
    public Diary createNewDiary(@PathVariable String id){
        return diaryService.createNewDiary(id);
    }

    @PutMapping("/{id}/{date}")
    public Diary updateDiaryEntry(@PathVariable String id, @PathVariable String date, @RequestBody List<FoodItem> foodItems){
        return diaryService.updateDiaryEntry(id, date, foodItems);
    }
}
