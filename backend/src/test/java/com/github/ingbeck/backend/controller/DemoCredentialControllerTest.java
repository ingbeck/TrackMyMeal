package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.democredentials.DemoCredential;
import com.github.ingbeck.backend.repository.DemoCredentialRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class DemoCredentialControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    private DemoCredentialRepository demoCredentialRepository;

    private final DemoCredential testCredential = new DemoCredential("1", "testCompany", "testUser", "123");

    @Test
    void isAuthorized_whenCredentialsDoNotExist_returnFalse() throws Exception {
        //GIVEN
        //THEN & WHEN
        mvc.perform(get("/api/demo/login/testUser/123"))
                .andExpect(content().string("false"))
                .andExpect(status().isOk());
    }

    @Test
    void isAuthorized_whenCredentialsExistAndPasswordIsValid_returnTrue() throws Exception {
        //GIVEN
        demoCredentialRepository.save(testCredential);

        //THEN & WHEN
        mvc.perform(get("/api/demo/login/testUser/123"))
                .andExpect(content().string("true"))
                .andExpect(status().isOk());
    }

    @Test
    void isAuthorized_whenCredentialsExistAndPasswordIsInvalid_returnFalse() throws Exception {
        //GIVEN
        demoCredentialRepository.save(testCredential);

        //THEN & WHEN
        mvc.perform(get("/api/demo/login/testUser/321"))
                .andExpect(content().string("false"))
                .andExpect(status().isOk());
    }

}