import {DiaryEntry, FoodItem} from "../types/Diary.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import "./MealOverview.css"
import {useEffect, useState} from "react";
import ModalFoodItems from "./modals/ModalFoodItems.tsx";
import BreakfastButton from "./svg/meal-icons/BreakfastButton.tsx";
import LunchButton from "./svg/meal-icons/LunchButton.tsx";
import DinnerButton from "./svg/meal-icons/DinnerButton.tsx";
import SnackButton from "./svg/meal-icons/SnackButton.tsx";
import {translateMealType} from "../Utility/Utility.ts";

type MealOverviewProps = {
    deleteFoodItem?: (foodItemToDelete: FoodItem) => void ,
    diaryEntry : DiaryEntry,
    mealType : string,
    isFull? : boolean,
    isHomeScreen : boolean
}
export default function MealOverview(props: Readonly<MealOverviewProps>) {

    const [foodItems, setFoodItems] = useState<FoodItem[]>([])
    const [openModalFoodItems, setOpenModalFoodItems] = useState<boolean>(false)

    useEffect(() => {
        if(props.diaryEntry){
            setFoodItems(props.diaryEntry.foodItems.filter(foodItem => foodItem.mealType === props.mealType))
        }
    }, [props.mealType, props.diaryEntry]);

    function getIcon(mealType : string) : ReactJSXElement {
        switch (mealType){
            case "BREAKFAST":
                return <BreakfastButton height={40} width={40} isFull={props.isFull}/>
            case "LUNCH":
                return <LunchButton width={40} height={40} isFull={props.isFull}/>
            case "DINNER":
                return <DinnerButton width={40} height={40} isFull={props.isFull}/>
            case "SNACK":
                return <SnackButton width={40} height={40} isFull={props.isFull}/>
            default:
                return ""
        }
    }

    return (
            <>
                <button className={"mealoverview"} onClick={() => setOpenModalFoodItems(true)}>
                    <div className={"wrapper"}>
                        {getIcon(props.mealType)}
                        <span className={props.isFull ? "isFull" : "label"}>{translateMealType(props.mealType)}</span>
                    </div>
                    <span className={props.isFull ? "isFull" : "gradient"}><span>{foodItems.reduce((sum, currentFoodItem) => sum + currentFoodItem.calories, 0)} <span id={"kcal"}>kcal</span></span></span>
                </button>
                <ModalFoodItems
                    open={openModalFoodItems}
                    foodItems={foodItems}
                    onClose={() => setOpenModalFoodItems(false)}
                    deleteFoodItem={props.deleteFoodItem}
                    mealType={props.mealType}
                    isHomescreen={props.isHomeScreen}
                />
            </>
        );

}