import {useEffect, useState} from "react";
import {DiaryEntry, FoodItem} from "../types/Diary.ts";
import "./HomeScreen.css"
import {AppUser} from "../types/AppUser.ts";
import MealOverview from "../components/MealOverview.tsx";
// @ts-ignore
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

type HomeScreenProps = {
    setCurrentRoute : (url:string) => void,
    deleteFoodItem: (foodItem: FoodItem) => void,
    setCurrentDiaryEntry : (entry: DiaryEntry | undefined) => void,
    appUser : AppUser,
    currentDiaryEntry? : DiaryEntry,
    getMe: () => void
}
export default function HomeScreen(props: Readonly<HomeScreenProps>) {

    const url = window.location.href;

    const [progress, setProgress] = useState<number>(0)
    const [totalCalories, setTotalCalories] = useState<number>(0)

    useEffect(() => {
        props.setCurrentRoute(url)
        props.getMe()
    }, [url]);

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
    }, [props.appUser,totalCalories]);

    function calculateProgress(whole: number, part: number) {
        setProgress(part / whole)
    }

    function renderMealOverview(mealType : string) : ReactJSXElement{

        if(props.currentDiaryEntry?.foodItems.find((foodItem) => foodItem.mealType === mealType)){
            return  <MealOverview diaryEntry={props.currentDiaryEntry} mealType={mealType} deleteFoodItem={props.deleteFoodItem}
                                  isFull={totalCalories > props.appUser.bmrWithActivity} isHomeScreen={true}/>
        }else{
            return null
        }
    }

    return (
        <div className={"page-container"}>
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
                {
                    (totalCalories > 0 && totalCalories <= props.appUser.bmrWithActivity) &&
                    <div className={"calorie-description"}>
                        <p>Um dein Gewicht zu halten, kannst du täglich etwa {props.appUser.bmrWithActivity} kcal essen.
                            Für heute sind noch {props.appUser.bmrWithActivity - totalCalories} kcal übrig. </p>
                    </div>
                }
                {
                    totalCalories > props.appUser.bmrWithActivity &&
                    <div className={"calorie-description-warning"}>
                        <p>Dein heutiger Kalorienbedarf wurde überschritten. Insgesamt hat du {totalCalories - props.appUser.bmrWithActivity } kcal zu viel zu dir genommen.</p>
                    </div>
                }
            </div>
            {
                props.currentDiaryEntry?.foodItems === undefined
                    ?
                    <>
                        <h2>Deine Mahlzeiten</h2>
                        <div className={"homescreen-meals"}>
                        <div className={"homescreen-meals-empty"}>
                                    <span>Keine Mahlzeiten vorhanden</span>
                                    <p>Drücke auf den runden Plus-Button, um eine Mahlzeit&nbsp;hinzuzufügen.</p>
                                </div>
                            </div>
                        </>
                        :
                        <div>
                            <h2>Deine Mahlzeiten</h2>
                            {renderMealOverview("BREAKFAST")}
                            {renderMealOverview("LUNCH")}
                            {renderMealOverview("DINNER")}
                            {renderMealOverview("SNACK")}
                        </div>
                }
        </div>
    );
}
