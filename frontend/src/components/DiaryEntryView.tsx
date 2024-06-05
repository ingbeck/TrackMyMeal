import {formattedDateCaption} from "../Utility/DateTime.ts";
import {DiaryEntry} from "../types/Diary.ts";
import MealOverview from "./MealOverview.tsx";
// @ts-ignore
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

type DiaryEntryViewProps = {
    date: string,
    diaryEntry: DiaryEntry | undefined,
    totalCalories: number,
    onClickBack: () => void
}
export default function DiaryEntryView(props: Readonly<DiaryEntryViewProps>){
    const date = new Date(props.date);
    let progress :number;

    if (props.diaryEntry){
        progress = props.diaryEntry.totalCalories/props.totalCalories;
    } else {
        progress = 0;
    }

    function renderMealOverview(mealType : string) : ReactJSXElement{

        if(props.diaryEntry?.foodItems.find((foodItem) => foodItem.mealType === mealType)){
            return  <MealOverview diaryEntry={props.diaryEntry} mealType={mealType} isHomeScreen={true}/>
        }else{
            return null
        }
    }

    return (
        <div className={"homescreen"}>
            <h1>{date.getDate()}.{formattedDateCaption(date)}</h1>
            <div className={"homescreen-dailyProgress"}>
                <span id={"dailyProgress-caption"}>Ziel</span>
                <div id={"progress"} className={"progressbar"}>
                    {props.diaryEntry &&
                        <>
                            <div className={progress > 1 ? "progressbar-fill-overflow" : "progressbar-fill"}
                                 style={{flex: progress}}>
                                {progress > 0.33 && <span>{props.diaryEntry.totalCalories} kcal</span>}
                            </div>
                            {progress < 0.33 && <span>{props.diaryEntry.totalCalories} kcal</span>}
                        </>
                    }
                </div>
                <div className={"dailyProgress-calories"}>
                    <span>0 kcal</span>
                    <span>{props.totalCalories} kcal</span>
                </div>
            </div>
            {
                props.diaryEntry?.foodItems === undefined
                    ?
                    <>
                        <h2>Deine Mahlzeiten</h2>
                        <div className={"homescreen-meals"}>
                            <div className={"homescreen-meals-empty"}>
                                <span>Keine Mahlzeiten vorhanden</span>
                                <p>Schade!&nbsp;Leider hast du keine Mahlzeiten getracked.</p>
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
            <div className={"modalAddFoodItem-btn-wrapper"}>
                    <button className={"cancel"} onClick={props.onClickBack}>Zurück</button>
            </div>
        </div>
    );
}
