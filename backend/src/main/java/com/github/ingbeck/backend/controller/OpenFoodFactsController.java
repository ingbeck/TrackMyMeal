package com.github.ingbeck.backend.controller;

import com.github.ingbeck.backend.model.OpenFoodFactsProducts;
import com.github.ingbeck.backend.service.OpenFoodFactsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/openfoodfacts")
@RequiredArgsConstructor
public class OpenFoodFactsController {

    private final OpenFoodFactsService openFoodFactsService;

    @GetMapping("/{product}")
    public OpenFoodFactsProducts searchProduct(@PathVariable String product){
        return openFoodFactsService.searchProduct(product);
    }

}
