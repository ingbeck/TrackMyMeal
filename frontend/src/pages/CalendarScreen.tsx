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

    return (
        <div className={"homescreen"}>
            <h1>Kalender</h1>
            <h2>{formattedDateCaption()}</h2>
            <CalendarView date={date}/>
        </div>
    );
}
