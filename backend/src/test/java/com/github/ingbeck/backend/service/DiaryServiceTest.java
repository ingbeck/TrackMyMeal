package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.diary.Diary;
import com.github.ingbeck.backend.repository.DiaryRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

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
        Diary actual = diaryService.creatNewDiary("321");

        //THEN
        verify(diaryRepository).save(any(Diary.class));
        assertEquals(expected,actual);
    }

}