import {CalendarDay} from "../types/CalendarMonth.ts";

type CalendarDayCardProps = {
    calendarDay : CalendarDay,
    isToday : (day: number) => boolean,
    percentage: number,
    clickCalendarDay: (day: number) => void
}

export default function CalendarDayCard(props: Readonly<CalendarDayCardProps>) {

    const progressFill: string = "linear-gradient(0deg, #4D2FFF3F "+props.percentage+"%, #FFF 0%)";

    return (
        <button className={props.isToday(props.calendarDay.day) ? "day_selected" : "day"}
                onClick={() => props.clickCalendarDay(props.calendarDay.day)}
                style={!props.isToday(props.calendarDay.day)
                    ?
                    {background: progressFill}
                    :
                    {}}>
            <span>{props.calendarDay.day}</span>
        </button>

    );
}

