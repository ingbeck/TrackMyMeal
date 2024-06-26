package com.github.ingbeck.backend.model.openfoodfactsresponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenFoodFactsProducts{

    List<OpenFoodFactsProduct> products;
}
