package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.diary.*;
import com.github.ingbeck.backend.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    public Diary creatNewDiary(String userId){
        List<DiaryEntry> emptyDiaryEntries = new ArrayList<>();

        return diaryRepository.save(new Diary(null, userId, emptyDiaryEntries));
    }

}
