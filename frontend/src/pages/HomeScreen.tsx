import {useEffect, useState} from "react";
import {Diary, DiaryEntry, FoodItem} from "../types/Diary.ts";
import "./HomeScreen.css"
import {AppUser} from "../types/AppUser.ts";
import MealOverview from "../components/MealOverview.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {getDateToday} from "../Utility/Utility.ts";

type HomeScreenProps = {
    setCurrentRoute : (url:string) => void,
    diary: Diary,
    appUser : AppUser,
    deleteFoodItems: (foodItemToDelete: FoodItem) => void
}
export default function HomeScreen(props: Readonly<HomeScreenProps>) {

    const url = window.location.href;
    const currentDiaryEntry : DiaryEntry | undefined = props.diary.diaryEntries.find(entry => entry.date === getDateToday());

    const [progress, setProgress] = useState<number>(0)
    const [totalCalories, setTotalCalories] = useState<number>(0)

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [url]);


    useEffect(() => {
        if(currentDiaryEntry !== undefined){
            setTotalCalories(currentDiaryEntry.totalCalories)
        }else{
            setTotalCalories(0)
        }
    }, [currentDiaryEntry]);

    useEffect(() => {
        if(totalCalories !== 0){
            calculateProgress(props.appUser.bmrWithActivity, totalCalories)
        }
    }, [props.appUser,totalCalories]);

    function calculateProgress(whole: number, part: number) {
        setProgress(part / whole)
    }

    function renderMealOverview(mealType : string) : ReactJSXElement{

        if(currentDiaryEntry?.foodItems.find((foodItem) => foodItem.mealType === mealType)){
            return  <MealOverview diaryEntry={currentDiaryEntry}
                                  deleteFoodItem={props.deleteFoodItems}
                                  mealType={mealType}
                                  isFull={totalCalories > props.appUser.bmrWithActivity}
                                  isHomeScreen={true}/>
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
                currentDiaryEntry?.foodItems === undefined
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
