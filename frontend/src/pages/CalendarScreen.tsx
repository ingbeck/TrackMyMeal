import {useEffect} from "react";

type CalendarScreenProps = {
    setCurrentRoute : (url:string) => void
}

export default function CalendarScreen(props: Readonly<CalendarScreenProps>) {

    const url = window.location.href;

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    return (
        <div>
            <h1>Kalender</h1>
        </div>
    );
}
