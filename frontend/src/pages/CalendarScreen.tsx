import {useEffect, useState} from "react";
import CalendarView from "../components/CalendarView.tsx";
import {Diary} from "../types/Diary.ts";
import {AppUser} from "../types/AppUser.ts";
import {formattedDateCaption, isCurrentMonth} from "../Utility/DateTime.ts";
import "./CalendarScreen.css"

type CalendarScreenProps = {
    setCurrentRoute : (url:string) => void,
    appUser: AppUser,
    getDiaryByUserId : (id: string | undefined) => void,
    diary: Diary
}

export default function CalendarScreen(props: Readonly<CalendarScreenProps>) {

    const[date, setDate] = useState<Date>(new Date())

    const url = window.location.href;

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    useEffect(() => {
        props.getDiaryByUserId(props.appUser.id)
    }, [props.appUser]);

    function calenderButtonClick(type: "back" | "next"){
        let year = date.getFullYear();
        let month = date.getMonth();

        if(type === "next"){
            if (month === 11) {
                year++;
                month = 0;
            } else {
                month++;
            }
        }else if(type === "back"){
            if (month === 0) {
                year--;
                month = 11;
            } else {
                month--;
            }
        }

        setDate(new Date(year, month));
    }

    return (
        <div className={"page-container"}>
            <h1>Kalender</h1>
            <div className={"calendar-wrapper"}>
                <div className={"calendar-navigation"}>
                    <h2>{formattedDateCaption(date)}</h2>
                    <div>
                        <button  id={"btn-back"} onClick={() => calenderButtonClick("back")}>{"<"}</button>
                        <button id={"btn-today"} onClick={() => setDate(new Date())}>Heute</button>
                        {
                            isCurrentMonth(date) ? <button id={"btn-next"} onClick={() => calenderButtonClick("next")}>{">"}</button> : <button style={{visibility:"hidden"}}>{">"}</button>
                        }
                    </div>
                </div>
                <CalendarView
                    appUserCalories={props.appUser.bmrWithActivity}
                    diaryEntries={props.diary.diaryEntries}
                    date={date}
                />
            </div>
        </div>
    );
}
