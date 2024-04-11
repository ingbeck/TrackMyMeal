package com.github.ingbeck.backend.model.diary;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@With
@Document("diaries")
public record Diary(
        String id,
        String userId,
        List<DiaryEntry> diaryEntries
) {
}
