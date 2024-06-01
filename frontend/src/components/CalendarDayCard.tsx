import {CalendarDay} from "../types/CalendarMonth.ts";
import "./CalendarDayCard.css"

type CalendarDayCardProps = {
    calendarDay : CalendarDay
}

export default function CalendarDayCard(props: Readonly<CalendarDayCardProps>) {
    return (
        <div className={"day"}>
            <span>{props.calendarDay.day}</span>
        </div>
    );
}

