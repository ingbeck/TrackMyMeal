package com.github.ingbeck.backend.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenFoodFactsProduct {
    String id;
    Nutriments nutriments;
    @JsonAlias({"product_name"})
    String name;
    @JsonAlias({"serving_quantity"})
    int servingSize;
    @JsonAlias({"serving_quantity_unit"})
    String servingUnit;
}
