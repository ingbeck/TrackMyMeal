import {CalendarDay} from "../types/CalendarMonth.ts";
import "./CalendarDayCard.css"

type CalendarDayCardProps = {
    calendarDay : CalendarDay,
    isToday : (day: number) => boolean
}

export default function CalendarDayCard(props: Readonly<CalendarDayCardProps>) {
    return (
        <div className={props.isToday(props.calendarDay.day) ? "day_selected" : "day"}>
            <span>{props.calendarDay.day}</span>
        </div>
    );
}

