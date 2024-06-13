import {Meal} from "../types/Meal.ts";
import MealItemCard from "./cards/MealItemCard.tsx";
import "./MealGallery.css"

type MealGalleryProps = {
    meals: Meal[],
    searchText: string
}
export default function MealGallery(props: Readonly<MealGalleryProps>) {

    return (
        <div className={"mealGallery"}>
            {props.meals.length !== 0
                ?
                props.meals.map((meal) => <MealItemCard key={meal.id} meal={meal} searchText={props.searchText}/>)
                :
                <span>Keine Mahlzeit gefunden</span>
            }
        </div>
    );
}

