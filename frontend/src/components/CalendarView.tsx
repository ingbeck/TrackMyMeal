import "./CalendarView.css"
import {CalendarMonth} from "../types/CalendarMonth.ts";
import CalendarDayCard from "./CalendarDayCard.tsx";

type CalendarViewProps = {
    date : Date
}

export default function CalendarView(props: Readonly<CalendarViewProps>) {

    const month = getCalendarMonth(props.date.getFullYear(), props.date.getMonth());

    function getDaysInMonth(year: number, month: number): number {
        const nextMonth = new Date(year, month, 1);
        nextMonth.setDate(nextMonth.getDate() - 1);
        return nextMonth.getDate();
    }

    function getWeekday(year: number, month: number, day: number): number {
        const date = new Date(year, month, day);
        return date.getDay()
    }

    function getCalendarMonth(year: number, month: number): CalendarMonth {
        const days = getDaysInMonth(year, month);
        const currentCalendarMonth : CalendarMonth = {
            year: year,
            month: month,
            calendarDays: []};
        for(let day = 0; day < days; day++){
            currentCalendarMonth.calendarDays = [
                {
                    day: day+1,
                    weekday: getWeekday(year, month, day)
                }
                , ...currentCalendarMonth.calendarDays
            ];
        }
        currentCalendarMonth.calendarDays.sort((a,b) => a.day - b.day);
        return currentCalendarMonth;
    }

    function fillWithBlankDays(weekday: number){
        const spans = [];
        let blanks: number = 0;

        if(weekday === 0){
            blanks = 6;
        }else{
            blanks = weekday;
        }

        for (let i = 0; i < blanks; i++) {
            spans.push(<span key={i}> </span>);
        }

        return spans
    }

    return (
        <div className={"calendar"}>
            <span>Mo</span>
            <span>Di</span>
            <span>Mi</span>
            <span>Do</span>
            <span>Fr</span>
            <span>Sa</span>
            <span>So</span>
            {
                month.calendarDays[0].weekday != 1 && fillWithBlankDays(month.calendarDays[0].weekday)
            }
            {
                month.calendarDays.map(day => <CalendarDayCard key={day.day} calendarDay={day}/>)
            }
        </div>
    );
}