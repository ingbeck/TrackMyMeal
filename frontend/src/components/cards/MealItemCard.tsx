import {Meal, MealItem, MealToSaveDto} from "../../types/Meal.ts";
import "./MealItemCard.css"
import {useEffect, useState} from "react";
import {highlightSearchText} from "../../Utility/Utility.ts";
import AddButton from "../svg/AddButton.tsx";
import {Modal} from "@mui/material";
import BreakfastButton from "../svg/meal-icons/BreakfastButton.tsx";
import LunchButton from "../svg/meal-icons/LunchButton.tsx";
import DinnerButton from "../svg/meal-icons/DinnerButton.tsx";
import SnackButton from "../svg/meal-icons/SnackButton.tsx";

type MealItemCardProps = {
    meal: Meal,
    searchText: string,
    addMealToDiary: (mealType: string, meal: MealToSaveDto) => void
}
export default function MealItemCard(props: Readonly<MealItemCardProps>) {

    const numberMealItemsToRender: number = 4;

    const [open, setOpen] = useState<boolean>(false);

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

    function handleAddButtonClick(){
        setOpen(!open);
    }

    function handleMealButtonClick(mealType: string){
        const mealToAdd: MealToSaveDto = {name: props.meal.name, mealItems: props.meal.mealItems}
        props.addMealToDiary(mealType, mealToAdd);
        setOpen(!open)
    }

    return (
        <>
            <div className={"card meal"}>
                <div className={"card-header mealCard_divider"}>
                    <div className={"card-header-wrapper"}>
                        <label id={props.meal.id}>{props.meal.name}</label>
                        <span className={"gradient"}><span
                            className={"serving"}>{props.meal.totalCalories}</span> kcal</span>
                    </div>
                    <button onClick={handleAddButtonClick}><AddButton width={40} height={40}/>
                    </button>
                </div>
                <div className={"meal_mealItem-wrapper"}>
                    {renderMealItems(numberMealItemsToRender)}
                    {props.meal.mealItems.length > numberMealItemsToRender &&
                        <span className={"meal_mealItem"}>...</span>}
                </div>
            </div>
            <Modal style={{placeSelf:"center"}} open={open} onClose={() => setOpen(!open)}>
                <div className={"mealButton-wrapper"}>
                    <button onClick={() => handleMealButtonClick("BREAKFAST")}>
                        <BreakfastButton width={40} height={40}/>
                        <span>Frühstück</span>
                    </button>
                    <button onClick={() => handleMealButtonClick("LUNCH")}>
                        <LunchButton width={40} height={40}/>
                        <span>Mittagessen</span>
                    </button>
                    <button onClick={() => handleMealButtonClick("DINNER")}>
                        <DinnerButton width={40} height={40}/>
                        <span>Abendessen</span>
                    </button>
                    <button onClick={() => handleMealButtonClick("SNACK")}>
                        <SnackButton width={40} height={40}/>
                        <span>Snack</span>
                    </button>
                </div>
            </Modal>
        </>


    )
        ;
}

