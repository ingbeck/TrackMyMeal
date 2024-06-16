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
import DeleteButton from "../svg/DeleteButton.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

type MealItemCardProps = {
    meal: Meal,
    searchText: string,
    addMealToDiary: (mealType: string, meal: MealToSaveDto) => void,
    deleteMeal: (id : string) => void,
    isEditable: boolean,
    renderMealItems: (numberItemsToRender : number, mealItems : MealItem[]) => ReactJSXElement
}

export default function MealItemCard(props: Readonly<MealItemCardProps>) {

    const numberMealItemsToRender: number = 4;

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {

        highlightSearchText(props.searchText, props.meal.id);

    }, [props]);

    function handleAddButtonClick(){
        setOpen(!open);
    }

    function handleDeleteButtonClick(){
        if (window.confirm("Möchtest du diese Mahlzeit löschen?"))
            props.deleteMeal(props.meal.id);
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
                    {
                        props.isEditable
                            ?
                            <button onClick={handleDeleteButtonClick}><DeleteButton/></button>
                            :
                            <button onClick={handleAddButtonClick}><AddButton width={40} height={40}/></button>
                    }
                </div>
                <div className={"meal_mealItem-wrapper"}>
                    {props.renderMealItems(numberMealItemsToRender, props.meal.mealItems)}
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

