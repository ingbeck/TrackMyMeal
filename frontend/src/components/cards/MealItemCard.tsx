import {Meal} from "../../types/Meal.ts";
import "./MealItemCard.css"

type MealItemCardProps = {
    meal: Meal
}
export default function MealItemCard(props: Readonly<MealItemCardProps>) {

    return (
        <div className={"mealItemCard"}>
            <span>{props.meal.name}</span>
            <span>{props.meal.totalCalories} kcal</span>
        </div>
    );
}

