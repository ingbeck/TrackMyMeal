import {FoodItem} from "../../types/Diary.ts";
import "./FoodItemCard.css"
import DeleteButton from "../svg/DeleteButton.tsx";

type FoodItemCardProps = {
    deleteFoodItem : (foodItemToDelete : FoodItem) => void,
    foodItem : FoodItem
}
export default  function FoodItemCard(props: Readonly<FoodItemCardProps>) {

    function onClick(){
        props.deleteFoodItem(props.foodItem)

    }
    return (
        <div className={"card"}>
            <div className={"card-header"}>
                <div className={"card-header-wrapper"}>
                    <label>{props.foodItem.name}</label>
                    <div>
                        <span className={"gradient"}><span
                            className={"serving"}>{props.foodItem.calories}</span> kcal</span>
                        <span
                            id={"servingsize"}>{" (" + props.foodItem.amount + " g)"}</span>
                    </div>
                </div>
                <button onClick={onClick}><DeleteButton/></button>
            </div>
        </div>
    );
}