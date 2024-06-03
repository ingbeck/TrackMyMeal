import {CalendarDay} from "../types/CalendarMonth.ts";
import "./CalendarDayCard.css"
import {CircularProgress} from "@mui/material";

type CalendarDayCardProps = {
    calendarDay : CalendarDay,
    isToday : (day: number) => boolean
}

export default function CalendarDayCard(props: Readonly<CalendarDayCardProps>) {
    return (
        <button className={props.isToday(props.calendarDay.day) ? "day_selected" : "day"}>
            <span>{props.calendarDay.day}</span>
            <CircularProgress variant={"determinate"} value={100} style={{position: "absolute"}}/>
        </button>
    );
}

