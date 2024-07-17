import DeleteButton from "../svg/DeleteButton.tsx";
import {MealItem} from "../../types/Meal.ts";

type MealItemCardProps = {
    deleteMealItem : (mealItemToDelete : MealItem) => void,
    mealItem : MealItem
}
export default  function MealItemCard(props: Readonly<MealItemCardProps>) {


    return (
        <div className={"card"}>
            <div className={"card-header"}>
                <div className={"card-header-wrapper"}>
                    <label>{props.mealItem.name}</label>
                    <div>
                        <span className={"gradient"}><span
                            className={"serving"}>{props.mealItem.calories}</span> kcal</span>
                        <span
                            id={"servingsize"}>{" (" + props.mealItem.amount + " g)"}</span>
                    </div>
                </div>
                <button onClick={() => props.deleteMealItem(props.mealItem)}><DeleteButton/></button>
            </div>
        </div>
    );
}