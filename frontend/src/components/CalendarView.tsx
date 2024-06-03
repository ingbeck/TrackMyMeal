import "./CalendarView.css"
import {CalendarMonth} from "../types/CalendarMonth.ts";
import CalendarDayCard from "./CalendarDayCard.tsx";

type CalendarViewProps = {
    date : Date
}

export default function CalendarView(props: Readonly<CalendarViewProps>) {

    const month = getCalendarMonth(props.date.getFullYear(), props.date.getMonth());

    function getDaysInMonth(year: number, month: number): number {
        const nextMonth = new Date(year, month + 1, 1);
        const lastDayOfMonth = new Date(nextMonth.getTime() - 1);
        return lastDayOfMonth.getDate();
    }

    function getWeekday(year: number, month: number, day: number): number {
        const date = new Date(year, month, day);
        return date.getDay();
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

    function fillWithNextDays(weekday: number){
        const spans = [];
        let nextDay : number;
        const dayToFill = 6-weekday;

        const calendarDaysOfNextMonth = getDaysInMonth(month.year, month.month+1)
        for (let i = 0; i < dayToFill; i++) {
            nextDay = calendarDaysOfNextMonth - (calendarDaysOfNextMonth - i);
            spans.push(<button key={i} className={"calendar_inactive-day"}>{nextDay+1}</button>);
        }
        return spans;
    }

    function fillWithPreviousDays(weekday: number){
        const spans = [];
        let previousDay : number;
        let dayToFill = weekday-1;

        const calendarDaysOfPreviousMonth = getDaysInMonth(month.year, month.month-1)
        for (let i = 0; i < weekday; i++) {
            previousDay = calendarDaysOfPreviousMonth - dayToFill;
            spans.push(<button key={i} className={"calendar_inactive-day"}>{previousDay}</button>);
            dayToFill--;
        }
        return spans;
    }

    function isToday(day:number): boolean{
        const today = new Date();
        return today.getDate() === day
            && today.getMonth() === props.date.getMonth()
            && today.getFullYear() === props.date.getFullYear();
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
                month.calendarDays[0].weekday != 0 && fillWithPreviousDays(month.calendarDays[0].weekday)
            }
            {
                month.calendarDays.map(day => <CalendarDayCard key={day.day} calendarDay={day} isToday={isToday}/>)
            }
            {
                month.calendarDays[month.calendarDays.length - 1].weekday != 6 && fillWithNextDays(month.calendarDays[month.calendarDays.length - 1].weekday)
            }
        </div>
    );
}