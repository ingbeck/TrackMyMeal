import {DiaryEntry} from "../types/Diary.ts";
// @ts-ignore
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import "./MealOverview.css"

type MealOverviewProps = {
    getMealTypeIcon: (mealType:string, iconSize:number) => ReactJSXElement,
    diaryEntry : DiaryEntry,
    mealType : string
}
export default function MealOverview(props: Readonly<MealOverviewProps>) {

        return (
            <div className={"mealoverview"}>
                {props.getMealTypeIcon(props.mealType, 32)}
                <span>{props.diaryEntry.foodItems.filter(foodItem => foodItem.mealType === props.mealType)
                    .reduce((sum, currentFoodItem) => sum + currentFoodItem.calories, 0)} kcal</span>
            </div>
        );

}