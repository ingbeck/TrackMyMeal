package com.github.ingbeck.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Nutriments {
    int energy;
    @JsonProperty("energy-kcal_100g")
    int energyKcal100g;
    @JsonProperty("energy-kcal_serving")
    int energyKcalServing;
}
