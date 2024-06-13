import {Meal, MealItem} from "../../types/Meal.ts";
import "./MealItemCard.css"
import {useEffect} from "react";
import {highlightSearchText} from "../../Utility/Utility.ts";

type MealItemCardProps = {
    meal: Meal,
    searchText: string
}
export default function MealItemCard(props: Readonly<MealItemCardProps>) {

    const numberMealItemsToRender: number = 4;

    useEffect(() => {

        highlightSearchText(props.searchText, props.meal.id);

    }, [props]);

    function renderMealItems(numberItemsToRender: number){
        let mealItemsToRender : MealItem[];
        let numberCommas : number;

        if(props.meal.mealItems.length > numberItemsToRender){
            mealItemsToRender = props.meal.mealItems.slice(0,numberItemsToRender);
            numberCommas = numberItemsToRender+1;
        }else{
            mealItemsToRender =props.meal.mealItems;
            numberCommas = props.meal.mealItems.length;
        }

        return mealItemsToRender.map((mealItem, count) => {
                count++;
                return <span key={mealItem.id} className={"meal_mealItem"}>{mealItem.name}{count < numberCommas && ","}</span>
            }
        )
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
                {renderMealItems(numberMealItemsToRender)}
                {props.meal.mealItems.length > numberMealItemsToRender && <span className={"meal_mealItem"}>...</span>}
            </div>
        </div>
    );
}

