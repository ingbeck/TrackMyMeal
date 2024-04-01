package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.ActivityLevel;
import com.github.ingbeck.backend.model.AppUser;
import com.github.ingbeck.backend.model.AppUserCreateDto;
import com.github.ingbeck.backend.model.AppUserGender;
import com.github.ingbeck.backend.repository.UserRepository;
import com.nimbusds.openid.connect.sdk.claims.Gender;
import org.junit.jupiter.api.Test;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {
    private final UserRepository repo = mock(UserRepository.class);
    private final UserService service = new UserService(repo);

    @Test
    void createUser_whenUserExistsAndCalledWithValidAppUserCreateDto_thenReturnAppUserWithDtosValue(){
        //GIVEN
        AppUserCreateDto appUserCreateDto = new AppUserCreateDto(
                "1991-06-14",
                AppUserGender.MALE,
                180,
                90,
                ActivityLevel.ATHLETE
        );

        AppUser expected = getAppUser(appUserCreateDto);
        when(repo.findById("1")).thenReturn(Optional.of(expected));
        when(repo.save(expected)).thenReturn(expected);

        //WHEN
        AppUser actual = service.createUser("1", appUserCreateDto);

        //THEN
        verify(repo).findById("1");
        assertEquals(expected,actual);
    }

    @Test
    void createUser_whenCalledWithInvalidIID_thenThrowException() throws NoSuchElementException{
        //GIVEN
        AppUserCreateDto appUserCreateDto = new AppUserCreateDto(
                "1991-06-14",
                AppUserGender.MALE,
                180,
                90,
                ActivityLevel.ATHLETE
        );

        assertThrows(NoSuchElementException.class, () -> {service.createUser("2", appUserCreateDto);});
    }

    private static AppUser getAppUser(AppUserCreateDto appUserCreateDto) {
        int bmr = (int)(66.47 + 13.75 * appUserCreateDto.weight() + 5.003 * appUserCreateDto.height() - 6.755 * 32);
        int bmrWithActivity = (int)(bmr * appUserCreateDto.activityLevel().getLevel());

        AppUser expected = new AppUser(
                "1",
                "Max Mustermann",
                "1991-06-14",
                32,
                "https://example.com/mustermax.jpg",
                AppUserGender.MALE,
                180,
                90,
                ActivityLevel.ATHLETE,
                bmr,
                bmrWithActivity,
                false
        );
        return expected;
    }

}