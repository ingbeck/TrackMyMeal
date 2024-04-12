package com.github.ingbeck.backend.service;

import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class OpenFoodFactsServiceTest {

    private static MockWebServer mockWebServer;

    @Autowired
    private MockMvc mvc;

    @BeforeAll
    static void setupMockWebServer() throws IOException{
        mockWebServer = new MockWebServer();
        mockWebServer.start();
    }

    @AfterAll
    static void shutDownMockWebSever() throws IOException{
        mockWebServer.shutdown();
    }

    @DynamicPropertySource
    static void backendProps(DynamicPropertyRegistry registry){
        registry.add("open-food-facts-api-url", () -> mockWebServer.url("/").toString());
    }

    @Test
    void searchProduct_shouldReturnEmptyList_whenCalledInitially() throws Exception{
        //GIVEN
        mockWebServer.enqueue(new MockResponse().setBody("""
                    {
                        "count": 1,
                        "page": "1",
                        "page_count": 1,
                        "page_size": 24,
                        "products": [
                            {
                                "nutriments": {
                                    "carbohydrates": "53.5",
                                    "carbohydrates_100g": "53.5",
                                    "carbohydrates_serving": "11.2",
                                    "carbohydrates_unit": "g",
                                    "carbohydrates_value": "53.5",
                                    "carbon-footprint-from-known-ingredients_100g": 236,
                                    "carbon-footprint-from-known-ingredients_product": 0,
                                    "carbon-footprint-from-known-ingredients_serving": "49.6",
                                    "energy": 2360,
                                    "energy-kcal": 566,
                                    "energy-kcal_100g": 566,
                                    "energy-kcal_serving": 119,
                                    "energy-kcal_unit": "kcal",
                                    "energy-kcal_value": 566,
                                    "energy-kcal_value_computed": "563.8",
                                    "energy-kj": 2360,
                                    "energy-kj_100g": 2360,
                                    "energy-kj_serving": 496,
                                    "energy-kj_unit": "kJ",
                                    "energy-kj_value": 2360,
                                    "energy-kj_value_computed": "2352.4",
                                    "energy_100g": 2360,
                                    "energy_serving": 496,
                                    "energy_unit": "kJ",
                                    "energy_value": 2360,
                                    "fat": 35,
                                    "fat_100g": 35,
                                    "fat_serving": "7.35",
                                    "fat_unit": "g",
                                    "fat_value": 35,
                                    "fruits-vegetables-legumes-estimate-from-ingredients_100g": 0,
                                    "fruits-vegetables-legumes-estimate-from-ingredients_serving": 0,
                                    "fruits-vegetables-nuts-estimate-from-ingredients_100g": 0,
                                    "fruits-vegetables-nuts-estimate-from-ingredients_serving": 0,
                                    "nutrition-score-fr": 28,
                                    "nutrition-score-fr_100g": 28,
                                    "proteins": "8.7",
                                    "proteins_100g": "8.7",
                                    "proteins_serving": "1.83",
                                    "proteins_unit": "g",
                                    "proteins_value": "8.7",
                                    "salt": "0.313",
                                    "salt_100g": "0.313",
                                    "salt_serving": "0.0657",
                                    "salt_unit": "g",
                                    "salt_value": "0.313",
                                    "saturated-fat": "22.6",
                                    "saturated-fat_100g": "22.6",
                                    "saturated-fat_serving": "4.75",
                                    "saturated-fat_unit": "g",
                                    "saturated-fat_value": "22.6",
                                    "sodium": "0.1252",
                                    "sodium_100g": "0.1252",
                                    "sodium_serving": "0.0263",
                                    "sodium_unit": "g",
                                    "sodium_value": "0.1252",
                                    "sugars": "53.3",
                                    "sugars_100g": "53.3",
                                    "sugars_serving": "11.2",
                                    "sugars_unit": "g",
                                    "sugars_value": "53.3"
                                },
                                "product_name": "Kinderriegel",
                                "serving_quantity": 21,
                                "serving_quantity_unit": "g"
                            }
                        ],
                        "skip": 0
                    }
                """)
                .addHeader("Content-Type", "application/json; charset=utf-8"));

        //THEN & WHEN
        mvc.perform(get("/api/openfoodfacts/kinderriegel"))
                .andExpect(status().isOk())
                .andExpect(content().json("""                          
                                                        {
                                                             "products": [
                                                                 {
                                                                     "nutriments": {
                                                                         "energy": 2360,
                                                                         "energyKcal100g": 566,
                                                                         "energyKcalServing": 119
                                                                     },
                                                                     "name": "Kinderriegel",
                                                                     "servingSize": 21,
                                                                     "servingUnit": "g"
                                                                 }
                                                             ]
                                                         }
                                                    """));
    }

}