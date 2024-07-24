package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.democredentials.DemoCredential;
import com.github.ingbeck.backend.repository.DemoCredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class DemoCredentialService {

    private final DemoCredentialRepository demoCredentialRepository;

    public boolean isAuthorized(String username, String password){

        try{
            DemoCredential credentialToCheck = demoCredentialRepository.findDemoCredentialByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));
            return credentialToCheck.password().equals(password);
        }catch (NoSuchElementException e ){
            return false;
        }
    }
}
