package com.github.ingbeck.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenFoodFactsProduct {
    Nutriments nutriments;
    @JsonProperty("product_name")
    String name;
    @JsonProperty("serving_quantity")
    int servingSize;
    @JsonProperty("serving_quantity_unit")
    String servingUnit;
}
