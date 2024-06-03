import {FoodItem} from "../../types/Diary.ts";
import DeleteButton from "../svg/DeleteButton.tsx";

type FoodItemCardProps = {
    deleteFoodItem? : (foodItemToDelete : FoodItem) => void,
    foodItem : FoodItem,
    isHomescreen: boolean
}
export default  function FoodItemCard(props: Readonly<FoodItemCardProps>) {

    function onClick(){
        if(props.deleteFoodItem){
            props.deleteFoodItem(props.foodItem)
        }
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
                {props.deleteFoodItem && <button onClick={onClick}><DeleteButton/></button>}
            </div>
        </div>
    );
}