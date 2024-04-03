package com.github.ingbeck.backend.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CurrentUrlServiceTest {

    private final CurrentUrlService currentUrlService = mock(CurrentUrlService.class);

    @Test
    void getAppUrl_whenCalledInitially_returnCurrentUrl(){
        //GIVEN
        String expected = "https://localhost:5173";
        when(currentUrlService.getAppUrl()).thenReturn("https://localhost:5173");

        //WHEN
        String actual = currentUrlService.getAppUrl();

        //THEN
        assertEquals(expected,actual);
    }

}