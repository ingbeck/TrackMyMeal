import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {DiaryEntry, FoodItem} from "../types/Diary.ts";
import "./HomeScreen.css"
import {AppUser} from "../types/AppUser.ts";
import BreakfastIcon from "../components/svg/meal-icons/BreakfastIcon.tsx";
import LunchIcon from "../components/svg/meal-icons/LunchIcon.tsx";
import DinnerIcon from "../components/svg/meal-icons/DinnerIcon.tsx";
import SnackIcon from "../components/svg/meal-icons/SnackIcon.tsx";
import MealOverview from "../components/MealOverview.tsx";
// @ts-ignore
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

type HomeScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void,
    deleteFoodItem: (foodItem: FoodItem) => void,
    appUser : AppUser,
    currentDiaryEntry? : DiaryEntry
}
export default function HomeScreen(props: Readonly<HomeScreenProps>) {

    const url = window.location.href;
    const params = useParams();
    const [progress, setProgress] = useState<number>(0)
    const [totalCalories, setTotalCalories] = useState<number>(0)

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [url]);

    useEffect(() => {
        props.getAppUser(params.id)
    }, [props.appUser.bmrWithActivity !== 0]);

    useEffect(() => {
        if(props.currentDiaryEntry !== undefined){
            setTotalCalories(props.currentDiaryEntry.totalCalories)
        }else{
            setTotalCalories(0)
        }
    }, [props.currentDiaryEntry]);

    useEffect(() => {
        if(totalCalories !== 0){
            calculateProgress(props.appUser.bmrWithActivity, totalCalories)
        }
    }, [totalCalories]);

    function calculateProgress(whole: number, part: number) {
        setProgress(part / whole)
    }

    function getMealTypeIcon(mealType : string, iconSize:number) : ReactJSXElement{
        switch (mealType){
            case "BREAKFAST":
                return <BreakfastIcon width={iconSize} height={iconSize}/>
            case "LUNCH":
                return <LunchIcon width={iconSize} height={iconSize}/>
            case "DINNER":
                return <DinnerIcon width={iconSize} height={iconSize}/>
            case "SNACK":
                return <SnackIcon width={iconSize} height={iconSize}/>
        }
    }

    return (
        <div className={"homescreen"}>
            <h1>Heute</h1>
            <div className={"homescreen-dailyProgress"}>
                <span id={"dailyProgress-caption"}>Ziel</span>
                <div id={"progress"} className={"progressbar"}>
                    {totalCalories !== 0 &&
                        <>
                            <div className={progress > 1 ? "progressbar-fill-overflow" : "progressbar-fill"}
                                 style={{flex: progress}}>
                                {progress > 0.33 && <span>{totalCalories} kcal</span>}
                            </div>
                            {progress < 0.33 && <span>{totalCalories} kcal</span>}
                        </>
                    }
                </div>
                <div className={"dailyProgress-calories"}>
                    <span>0 kcal</span>
                    <span>{props.appUser.bmrWithActivity} kcal</span>
                </div>
            </div>
                <h2>Deine Mahlzeiten</h2>
                {
                    props.currentDiaryEntry?.foodItems === undefined
                        ?
                        <div className={"homescreen-meals"}>
                            <div className={"homescreen-meals-empty"}>
                                <span>Keine Mahlzeiten vorhanden</span>
                                <p>Drücke auf den runden Plus-Button,&nbsp;um eine Mahlzeit hinzuzufügen..</p>
                            </div>
                        </div>
                        :
                        <div>
                            {props.currentDiaryEntry.foodItems.find((foodItem) => foodItem.mealType === "BREAKFAST") &&
                               <MealOverview diaryEntry={props.currentDiaryEntry} mealType={"BREAKFAST"} getMealTypeIcon={getMealTypeIcon} deleteFoodItem={props.deleteFoodItem}/>
                            }
                            {props.currentDiaryEntry?.foodItems.find((foodItem) => foodItem.mealType === "LUNCH") &&
                                <MealOverview diaryEntry={props.currentDiaryEntry} mealType={"LUNCH"} getMealTypeIcon={getMealTypeIcon} deleteFoodItem={props.deleteFoodItem}/>
                            }
                            {props.currentDiaryEntry?.foodItems.find((foodItem) => foodItem.mealType === "DINNER") &&
                                <MealOverview diaryEntry={props.currentDiaryEntry} mealType={"DINNER"} getMealTypeIcon={getMealTypeIcon} deleteFoodItem={props.deleteFoodItem}/>
                            }
                            {props.currentDiaryEntry?.foodItems.find((foodItem) => foodItem.mealType === "SNACK") &&
                                <MealOverview diaryEntry={props.currentDiaryEntry} mealType={"SNACK"} getMealTypeIcon={getMealTypeIcon} deleteFoodItem={props.deleteFoodItem}/>
                            }
                        </div>
                }
        </div>
    );
}