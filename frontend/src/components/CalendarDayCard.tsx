import {CalendarDay} from "../types/CalendarMonth.ts";
import {CircularProgress} from "@mui/material";

type CalendarDayCardProps = {
    calendarDay : CalendarDay,
    isToday : (day: number) => boolean,
    percentage: number,
    clickCalendarDay: (day: number) => void
}

export default function CalendarDayCard(props: Readonly<CalendarDayCardProps>) {
    return (
        <button className={props.isToday(props.calendarDay.day) ? "day_selected" : "day"}
        onClick={() => props.clickCalendarDay(props.calendarDay.day)}>
            <CircularProgress id={"backgroundCircle"}
                              variant={"determinate"}
                              value={100}
                              sx={{ scale: "-1 1" }}/>
            <CircularProgress id={"foregroundCircle"}
                              variant={"determinate"}
                              value={props.percentage}
                              sx={{ scale: "-1 1" }} />
            <span>{props.calendarDay.day}</span>
        </button>
    );
}

