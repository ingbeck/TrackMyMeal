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
        <div className={"homescreen"} style={{paddingTop: 100}}>
            <div className={"homescreen-meals"}>
                <div className={"homescreen-meals-empty"}>
                    <span>Coming</span>
                </div>
            </div>
        </div>
    );
}
