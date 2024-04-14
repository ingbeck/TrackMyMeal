import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Diary} from "../types/Diary.ts";
import "./HomeScreen.css"
import {AppUser} from "../types/AppUser.ts";
import BreakfastIcon from "../components/svg/meal-icons/BreakfastIcon.tsx";
import LunchIcon from "../components/svg/meal-icons/LunchIcon.tsx";
import DinnerIcon from "../components/svg/meal-icons/DinnerIcon.tsx";
import SnackIcon from "../components/svg/meal-icons/SnackIcon.tsx";
import {getDateToday} from "../Utility.ts";
import MealOverview from "../components/MealOverview.tsx";
// @ts-ignore
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

type HomeScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void,
    appUser : AppUser,
    diary : Diary
}
export default function HomeScreen(props: Readonly<HomeScreenProps>) {

    const url = window.location.href;
    const today = getDateToday();
    const params = useParams();
    const diaryEntryToday = props.diary.diaryEntries.find((entry) => entry.date === today);

    const [progress, setProgress] = useState<number>(0)
    const [totalCalories, setTotalCalories] = useState<number>(0)

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [url]);

    useEffect(() => {
        props.getAppUser(params.id)
    }, [props.appUser.bmrWithActivity === 0]);

    useEffect(() => {
        calculateProgress(props.appUser.bmrWithActivity, totalCalories)
    }, [props.appUser.bmrWithActivity !== 0]);

    useEffect(() => {
        if(diaryEntryToday !== undefined){
            setTotalCalories(diaryEntryToday.totalCalories)
        }else{
            setTotalCalories(0)
        }
        calculateProgress(props.appUser.bmrWithActivity, totalCalories)
    }, [diaryEntryToday]);

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
                <h2>Ziel</h2>
                <div id={"progress"} className={"progressbar"}>
                    {props.appUser.bmrWithActivity !== 0 &&
                        <>
                            <div className={progress > 1 ? "progressbar-fill-overflow" : "progressbar-fill"}
                                 style={{flex: progress}}>
                                {progress > 0.25 && <span>{totalCalories} kcal</span>}
                            </div>
                            {progress < 0.25 && <span>{totalCalories} kcal</span>}
                        </>
                    }
                </div>
                <h3>{props.appUser.bmrWithActivity} kcal</h3>
            </div>
            <div>
                <h2>Deine Ernährung</h2>
                {
                    !diaryEntryToday?.foodItems
                        ?
                        <p>Für heute hast du noch nichts hinzugefügt. Drücke auf das Plus, um Mahlzeiten
                            hinzuzufügen.</p>
                        :
                        <div>
                            {diaryEntryToday?.foodItems.map((foodItem) => foodItem.mealType === "BREAKFAST") &&
                               <MealOverview diaryEntry={diaryEntryToday} mealType={"BREAKFAST"} getMealTypeIcon={getMealTypeIcon}/>
                            }
                            {diaryEntryToday?.foodItems.map((foodItem) => foodItem.mealType === "LUNCH") &&
                                <MealOverview diaryEntry={diaryEntryToday} mealType={"LUNCH"} getMealTypeIcon={getMealTypeIcon}/>
                            }
                            {diaryEntryToday?.foodItems.map((foodItem) => foodItem.mealType === "DINNER") &&
                                <MealOverview diaryEntry={diaryEntryToday} mealType={"DINNER"} getMealTypeIcon={getMealTypeIcon}/>
                            }
                            {diaryEntryToday?.foodItems.map((foodItem) => foodItem.mealType === "SNACK") &&
                                <MealOverview diaryEntry={diaryEntryToday} mealType={"SNACK"} getMealTypeIcon={getMealTypeIcon}/>
                            }
                        </div>
                }
            </div>
        </div>
    );
}