import {useEffect, useState} from "react";
import CalendarView from "../components/CalendarView.tsx";
import {useParams} from "react-router-dom";

type CalendarScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void
}

export default function CalendarScreen(props: Readonly<CalendarScreenProps>) {

    const[date, setDate] = useState<Date>(new Date())

    const url = window.location.href;
    const params = useParams();

    function formattedDateCaption(): string {
        const formatter = new Intl.DateTimeFormat('de-DE', { month: 'long' });
        return formatter.format(date)+" "+date.getFullYear();
    }

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    function isCurrentMonth(date : Date): boolean{
        const now : Date = new Date();
        return ((date.getFullYear()) != now.getFullYear() || (date.getMonth() != now.getMonth()));
    }

    function buttonBackClick(){
        let year = date.getFullYear();
        let month = date.getMonth();

        if (month === 0) {
            year--;
            month = 11;
        } else {
            month--;
        }
        setDate(new Date(year, month));
    }

    function buttonNextClick(){
        let year = date.getFullYear();
        let month = date.getMonth();

        if (month === 11) {
            year++;
            month = 0;
        } else {
            month++;
        }

        setDate(new Date(year, month));
    }



    return (
        <div className={"homescreen"}>
            <h1>Kalender</h1>
            <h2>{formattedDateCaption()}</h2>
            <div>
                <button onClick={buttonBackClick}>{"<"}</button>
                <button onClick={() => setDate(new Date())}>Heute</button>
                {
                    isCurrentMonth(date) && <button onClick={buttonNextClick}>{">"}</button>
                }
            </div>
            <CalendarView date={date}/>
        </div>
    );
}
