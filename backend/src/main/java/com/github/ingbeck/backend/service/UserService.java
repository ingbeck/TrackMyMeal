package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.appuser.AppUser;
import com.github.ingbeck.backend.model.appuser.AppUserCreateDto;
import com.github.ingbeck.backend.model.appuser.AppUserGender;
import com.github.ingbeck.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final DiaryService diaryService;

    public AppUser getUser(String id){
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Element with id: " + id + " not in database!"));
    }

    public AppUser createUser(String id, AppUserCreateDto appUserCreateDto){
        int bmr = (int)calculateBMR(appUserCreateDto.height(), appUserCreateDto.weight(), calculateAge(appUserCreateDto.birthdate()), appUserCreateDto.gender());
        int bmrWithActivity = (int)(bmr * appUserCreateDto.activityLevel().getLevel());
        AppUser currentUser = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Element with id: " + id + " not in database!"));
        AppUser appUserToSave = new AppUser(
                id,
                currentUser.getName(),
                appUserCreateDto.birthdate(),
                calculateAge(appUserCreateDto.birthdate()),
                currentUser.getAvatarUrl(),
                appUserCreateDto.gender(),
                appUserCreateDto.height(),
                appUserCreateDto.weight(),
                appUserCreateDto.activityLevel(),
                bmr,
                bmrWithActivity,
                false
        );
        return userRepository.save(appUserToSave);
    }

    public void deleteUserById(String id){
        diaryService.deleteDiaryByUserId(id);
        userRepository.deleteById(id);
    }

    private double calculateBMR(int height, int weight, int age, AppUserGender gender) {
        if(gender == AppUserGender.MALE){
            return 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
        }else{
            return 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
        }
    }

    private int calculateAge(String birthdate){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime dateBirthdate = LocalDate.parse(birthdate, formatter).atStartOfDay();

        return (int)ChronoUnit.YEARS.between(dateBirthdate, LocalDateTime.now());
    }
}
