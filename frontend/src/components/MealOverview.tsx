import {DiaryEntry, FoodItem} from "../types/Diary.ts";
// @ts-ignore
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import "./MealOverview.css"
import {useEffect, useState} from "react";
import ModalFoodItems from "./ModalFoodItems.tsx";

type MealOverviewProps = {
    getMealTypeIcon: (mealType:string, iconSize:number) => ReactJSXElement,
    diaryEntry : DiaryEntry,
    mealType : string
}
export default function MealOverview(props: Readonly<MealOverviewProps>) {

        const [foodItems, setFoodItems] = useState<FoodItem[]>([])
        const [openModalFoodItems, setOpenModalFoodItems] = useState<boolean>(false)

    useEffect(() => {
        setFoodItems(props.diaryEntry.foodItems.filter(foodItem => foodItem.mealType === props.mealType))
    }, []);

        return (
            <>
                <button className={"mealoverview"} onClick={() => setOpenModalFoodItems(true)}>
                    {props.getMealTypeIcon(props.mealType, 32)}
                    <span>{foodItems.reduce((sum, currentFoodItem) => sum + currentFoodItem.calories, 0)} kcal</span>
                </button>
                <ModalFoodItems
                    open={openModalFoodItems}
                    foodItems={foodItems}
                    onClose={() => setOpenModalFoodItems(false)}
                    mealType={props.mealType}
                />
            </>
        );

}