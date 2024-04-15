package com.github.ingbeck.backend.model.openfoodfactsresponse;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Nutriments {
    int energy;
    @JsonAlias({"energy-kcal_100g"})
    int energyKcal100g;
    @JsonAlias({"energy-kcal_serving"})
    int energyKcalServing;
}
