package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.democredentials.DemoCredential;
import com.github.ingbeck.backend.model.democredentials.DemoCredentialDto;
import com.github.ingbeck.backend.repository.DemoCredentialRepository;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class DemoCredentialServiceTest {
    private final DemoCredentialRepository demoCredentialRepository = mock(DemoCredentialRepository.class);
    private final DemoCredentialService demoCredentialService = new DemoCredentialService(demoCredentialRepository);

    private final DemoCredential testCredential = new DemoCredential("1", "testCompany", "testUser", "123");

    @Test
    void isAuthorized_whenCredentialsDoNotExist_returnFalse(){
        //GIVEN
        DemoCredentialDto demoCredentialDto = new DemoCredentialDto("testUser", "123");
        //THEN & WHEN
        assertFalse(demoCredentialService.isAuthorized(demoCredentialDto));
    }

    @Test
    void isAuthorized_whenCredentialsExistAndPasswordIsValid_returnTrue(){
        //GIVEN
        DemoCredentialDto demoCredentialDto = new DemoCredentialDto("testUser", "123");
        when(demoCredentialRepository.findDemoCredentialByUsername("testUser")).thenReturn(Optional.of(testCredential));

        //THEN & WHEN
        assertTrue(demoCredentialService.isAuthorized(demoCredentialDto));
    }

    @Test
    void isAuthorized_whenCredentialsExistAndPasswordIsInvalid_returnFalse(){
        //GIVEN
        DemoCredentialDto demoCredentialDto = new DemoCredentialDto("testUser", "321");
        when(demoCredentialRepository.findDemoCredentialByUsername("testUser")).thenReturn(Optional.of(testCredential));
        //THEN & WHEN
        assertFalse(demoCredentialService.isAuthorized(demoCredentialDto));
    }

    @Test
    void isAuthorized_whenCredentialsAreEmpty_returnFalse(){
        //GIVEN
        DemoCredentialDto demoCredentialDto = new DemoCredentialDto("", "");
        //THEN & WHEN
        assertFalse(demoCredentialService.isAuthorized(demoCredentialDto));
    }

}