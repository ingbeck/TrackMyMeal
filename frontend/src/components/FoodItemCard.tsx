import {FoodItem} from "../types/Diary.ts";
import "./FoodItemCard.css"

type FoodItemCardProps = {
    deleteFoodItem : (foodItemToDelete : FoodItem) => void,
    foodItem : FoodItem
}
export default  function FoodItemCard(props: Readonly<FoodItemCardProps>) {

    function onClick(){
        props.deleteFoodItem(props.foodItem)

    }
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
                    <button onClick={onClick}>Löschen</button>
                </div>
            </div>
        </div>
    );
}