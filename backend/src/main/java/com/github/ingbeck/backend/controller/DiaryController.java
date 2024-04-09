package com.github.ingbeck.backend.controller;
import com.github.ingbeck.backend.model.diary.Diary;
import com.github.ingbeck.backend.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/diaries")
public class DiaryController {

    private final DiaryService diaryService;

    @PostMapping("/{id}")
    public Diary createNewDiary(@PathVariable String id){
        return diaryService.creatNewDiary(id);
    }
}
