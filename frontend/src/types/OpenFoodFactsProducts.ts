export type OpenFoodFactsProducts = {
    products : OpenFoodFactsProduct[]
}

export type OpenFoodFactsProduct = {
    nutriments : Nutriments,
    name : string,
    servingSize : number,
    servingUnit : string
}

type Nutriments = {
    energy : number,
    energyKcal100g: number,
    energyKcalServing : number
}