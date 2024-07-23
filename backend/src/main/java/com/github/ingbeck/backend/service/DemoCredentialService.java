package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.democredentials.DemoCredential;
import com.github.ingbeck.backend.repository.DemoCredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DemoCredentialService {

    private final DemoCredentialRepository demoCredentialRepository;

    public boolean isAuthorized(String username, String password){

        DemoCredential credentialToCheck = demoCredentialRepository.findDemoCredentialByUsername(username).orElse(null);

        if(credentialToCheck == null){
            return false;
        }else{
            return credentialToCheck.password().equals(password);
        }
    }
}
