import {useEffect, useState} from "react";
import CalendarView from "../components/CalendarView.tsx";

type CalendarScreenProps = {
    setCurrentRoute : (url:string) => void
}

export default function CalendarScreen(props: Readonly<CalendarScreenProps>) {

    const[date, setDate] = useState<Date>(new Date())

    const url = window.location.href;

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

        // If it's December, add 1 to the year and set the month to January
        if (month === 11) {
            year++;
            month = 0; // January is 0 since months are zero-indexed
        } else {
            month++; // Otherwise, just add 1 to the month
        }

        // Create a new Date object for the next month
        setDate(new Date(year, month));
    }



    return (
        <div className={"homescreen"}>
            <h1>Kalender</h1>
            <h2>{formattedDateCaption()}</h2>
            <div>
                <button onClick={buttonBackClick}>zurück</button>
                {
                    isCurrentMonth(date) && <button onClick={buttonNextClick}>vor</button>
                }
            </div>
            <CalendarView date={date}/>
        </div>
    );
}
