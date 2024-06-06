import {useEffect, useState} from "react";
import CalendarView from "../components/CalendarView.tsx";
import {useParams} from "react-router-dom";
import {Diary} from "../types/Diary.ts";
import {AppUser} from "../types/AppUser.ts";
import {formattedDateCaption, isCurrentMonth} from "../Utility/DateTime.ts";

type CalendarScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void,
    appUser: AppUser,
    getDiaryByUserId : (id: string | undefined) => void,
    diary: Diary
}

export default function CalendarScreen(props: Readonly<CalendarScreenProps>) {

    const[date, setDate] = useState<Date>(new Date())

    const url = window.location.href;
    const params = useParams();

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    useEffect(() => {
        props.getAppUser(params.id)
        props.getDiaryByUserId(params.id)
    }, [params.id]);

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
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
                <h2>{formattedDateCaption(date)}</h2>
                <div>
                    <button onClick={() => calenderButtonClick("back")}>{"<"}</button>
                    <button onClick={() => setDate(new Date())}>Heute</button>
                    {
                        isCurrentMonth(date) ? <button onClick={() => calenderButtonClick("next")}>{">"}</button> : <button style={{visibility:"hidden"}}>{">"}</button>
                    }
                </div>
            </div>
            <CalendarView
                appUserCalories={props.appUser.bmrWithActivity}
                diaryEntries={props.diary.diaryEntries}
                date={date}
            />
        </div>
    );
}
