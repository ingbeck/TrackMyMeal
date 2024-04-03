package com.github.ingbeck.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CurrentUrlService {

    @Value("${APP_URL}")
    private String appURL;

    public String getAppUrl(){
        return appURL;
    }
}
