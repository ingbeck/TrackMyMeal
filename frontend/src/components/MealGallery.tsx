import {Meal} from "../types/Meal.ts";
import MealItemCard from "./cards/MealItemCard.tsx";
import "./MealGallery.css"

type MealGalleryProps = {
    meals: Meal[]
}
export default function MealGallery(props: Readonly<MealGalleryProps>) {
    return (
        <div className={"mealGallery"}>
            {props.meals.length !== 0
                ?
                props.meals.map((meal) => <MealItemCard key={meal.id} meal={meal}/>)
                :
                <span>Keine Mahlzeit gefunden</span>
            }
        </div>
    );
}

