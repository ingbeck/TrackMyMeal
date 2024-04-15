import {FoodItem} from "../types/Diary.ts";
import "./FoodItemCard.css"

type FoodItemCardProps = {
    foodItem : FoodItem
}
export default  function FoodItemCard(props: Readonly<FoodItemCardProps>) {
    return (
        <div className={"foodItemCard"}>
            <div className={"FoodItemCard-wrapper"}>
                <div className={"FoodItemCard-stats-wrapper"}>
                    <span>{props.foodItem.name}</span>
                    <div>
                        <p>{props.foodItem.amount} {props.foodItem.unit}</p>
                    </div>
                    <span>{props.foodItem.calories} kcal</span>
                </div>
                <div className={"FoodItemCard-btn-wrapper"}>
                    <button>Bearbeiten</button>
                    <button>Löschen</button>
                </div>
            </div>
        </div>
    );
}