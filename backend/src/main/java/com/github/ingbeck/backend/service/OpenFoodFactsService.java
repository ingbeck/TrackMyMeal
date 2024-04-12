package com.github.ingbeck.backend.service;

import com.github.ingbeck.backend.model.OpenFoodFactsProducts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class OpenFoodFactsService {

    public OpenFoodFactsService(@Value("${open-food-facts-api-url}")String baseUrl){
        this.rc = RestClient.create(baseUrl);
    }

    private final RestClient rc;

    public OpenFoodFactsProducts searchProduct(String product){
        return rc.get()
                .uri("search.pl?search_simple=1&json=1&countries=de&fields=product_name,nutriments,serving_quantity,serving_quantity_unit&search_terms="+product)
                .retrieve()
                .body(OpenFoodFactsProducts.class);
    }

}
