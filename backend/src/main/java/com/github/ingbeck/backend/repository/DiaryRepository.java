package com.github.ingbeck.backend.repository;

import com.github.ingbeck.backend.model.diary.Diary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends MongoRepository<Diary, String> {

     Diary findDiaryByUserId(String userId);
}
