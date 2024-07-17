import {Meal, MealItem, MealToSaveDto} from "../types/Meal.ts";
import MealCard from "./cards/MealCard.tsx";
import "./MealGallery.css"

type MealGalleryProps = {
    meals: Meal[],
    searchText: string,
    addMealToDiary: (mealType: string, meal: MealToSaveDto) => void,
    deleteMeal: (id : string) => void,
    isEditable: boolean,
    renderMealItems: (numberItemsToRender : number, mealItems : MealItem[]) => void,
    userHasMeals: boolean
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
                <div className={"homescreen-meals-empty"}>
                    <span>Keine Mahlzeiten vorhanden</span>
                    {!props.userHasMeals && <p>Drücke auf den runden Edit-Button oben rechts, um eine Mahlzeit&nbsp;zu erstellen.</p>}
                </div>
            }
        </div>
    );
}

