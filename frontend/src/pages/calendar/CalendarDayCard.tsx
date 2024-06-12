import {CalendarDay} from "../../types/CalendarMonth.ts";

type CalendarDayCardProps = {
    calendarDay : CalendarDay,
    isToday : (day: number) => boolean,
    percentage: number,
    clickCalendarDay: (day: number) => void,
    isLaterThanToday: (day: number) => boolean
}

export default function CalendarDayCard(props: Readonly<CalendarDayCardProps>) {

    const progressFill: string = "linear-gradient(0deg, #4D2FFF3F "+props.percentage+"%, #eee 0%)";
    const todayDate: string = "linear-gradient(0deg, #4A30FF 0%, #9018FE 31.5%, #C009FC 68.5%, #D161E2 100%)";

    return (
        <>
            {
                !props.isLaterThanToday(props.calendarDay.day)
                    ?
                    <button className={"day"}
                            onClick={() => props.clickCalendarDay(props.calendarDay.day)}
                            style={!props.isToday(props.calendarDay.day)
                                ?
                                {background: progressFill, color:"#000"}
                                :
                                {background: todayDate, color:"#fff"}}>
                        <span>{props.calendarDay.day}</span>
                    </button>
                    :
                    <div className={"day"} style={{}}>
                        <span>{props.calendarDay.day}</span>
                    </div>
            }

        </>
    );
}

