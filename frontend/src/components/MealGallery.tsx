import {Meal, MealItem, MealToSaveDto} from "../types/Meal.ts";
import MealCard from "./cards/MealCard.tsx";
import "./MealGallery.css"

type MealGalleryProps = {
    meals: Meal[],
    searchText: string,
    addMealToDiary: (mealType: string, meal: MealToSaveDto) => void,
    deleteMeal: (id : string) => void,
    isEditable: boolean,
    renderMealItems: (numberItemsToRender : number, mealItems : MealItem[]) => void
}
export default function MealGallery(props: Readonly<MealGalleryProps>) {

    return (
        <div className={"mealGallery"}>
            {props.meals.length !== 0
                ?
                props.meals.map((meal) => <MealCard
                    key={meal.id}
                    meal={meal}
                    searchText={props.searchText}
                    addMealToDiary={props.addMealToDiary}
                    deleteMeal={props.deleteMeal}
                    isEditable={props.isEditable} renderMealItems={props.renderMealItems}/>)
                :
                <span>Keine Mahlzeit gefunden</span>
            }
        </div>
    );
}

