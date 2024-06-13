import {Meal, MealItem} from "../../types/Meal.ts";
import "./MealItemCard.css"
import {useEffect} from "react";

type MealItemCardProps = {
    meal: Meal,
    searchText: string
}
export default function MealItemCard(props: Readonly<MealItemCardProps>) {

    useEffect(() => {

        search(props.searchText, props.meal.id);

    }, [props]);

    function renderMealItems(){
        let mealItemsToRender: MealItem[];

        if(props.meal.mealItems.length > 2){
            mealItemsToRender = props.meal.mealItems.slice(0,2);
        }else{
            mealItemsToRender =props.meal.mealItems;
        }

        return mealItemsToRender.map(mealItem =>
            <span key={mealItem.id} className={"meal_mealItem"}>{mealItem.name}</span>
        )
    }

    function search(searchText : string, elementToSearchId : string){
        const textToSearch : string = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern : RegExp = new RegExp(textToSearch, "gi");
        const elementToReplace = document.getElementById(elementToSearchId)

        if(textToSearch !== ""){
            if(elementToReplace && elementToReplace.textContent){
                elementToReplace.innerHTML = elementToReplace.textContent.replace(pattern, match => `<mark>${match}</mark>`)
            }
        }else{
            if(elementToReplace && elementToReplace.textContent){
                elementToReplace.innerHTML = elementToReplace.textContent.replace(textToSearch, "")
            }
        }
    }

    return (
        <div className={"card meal"}>
            <div className={"card-header mealCard_divider"}>
                <div className={"card-header-wrapper"}>
                    <label id={props.meal.id}>{props.meal.name}</label>
                    <span className={"gradient"}><span
                        className={"serving"}>{props.meal.totalCalories}</span> kcal</span>
                </div>
            </div>
            <div className={"meal_mealItem-wrapper"}>
                {renderMealItems()}
                {props.meal.mealItems.length > 2 && <span className={"meal_mealItem"}>...</span>}
            </div>
        </div>
    );
}

