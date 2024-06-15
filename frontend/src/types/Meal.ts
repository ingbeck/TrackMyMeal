export type Meal = {
    id: string,
    userId: string,
    name: string,
    totalCalories : number,
    mealItems: MealItem[]
}

export type MealToSaveDto = {
    name: string,
    mealItems: MealItem[]
}

export type MealItem = {
    id: string,
    name: string,
    amount: number,
    unit: string,
    calories: number,
    energyKcal100: number
}
