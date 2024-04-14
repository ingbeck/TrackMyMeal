export type Diary = {
    id : string,
    userId : string,
    diaryEntries : DiaryEntry[]
}

export type DiaryEntry = {
    date : string,
    foodItems : FoodItem[],
    totalCalories : number
}

export type FoodItem = {
    name : string,
    amount : number,
    unit : string,
    calories : number,
    mealType : string
}