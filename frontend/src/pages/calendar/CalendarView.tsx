import {CalendarMonth} from "../../types/CalendarMonth.ts";
import CalendarDayCard from "./CalendarDayCard.tsx";
import {DiaryEntry} from "../../types/Diary.ts";
import "./CalendarView.css"
import {Drawer} from "@mui/material";
import {useState} from "react";
import DiaryEntryView from "./DiaryEntryView.tsx";
type CalendarViewProps = {
    diaryEntries: DiaryEntry[],
    appUserCalories: number,
    date : Date
}

export default function CalendarView(props: Readonly<CalendarViewProps>) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [clickedDate, setClickedDate] = useState<string>("")

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

    function isLaterThanToday(day: number) : boolean{
        const today = new Date();
        const dateToCheck = new Date(month.year, month.month, day);

        return today < dateToCheck;
    }

    function percentageCaloriesOfDiaryEntry(diaryEntryTotalCalories?: number): number{
        let percentage: number = 0;

        if(!diaryEntryTotalCalories){
            return percentage;
        }else{
            percentage = diaryEntryTotalCalories/props.appUserCalories * 100;

            switch (true){
                case percentage <= 20: return 20;
                case percentage <= 40: return 40;
                case percentage <= 60: return 60;
                case percentage <= 80: return 80;
                case percentage <= 100: return 100;
                default: return percentage;
            }
        }
    }

    function getDiaryEntryCaloriesByDate(year: number, month: number, day:number): number{

        const date = formattedDate(year, month, day);

        return percentageCaloriesOfDiaryEntry(props.diaryEntries.find(diaryEntry => diaryEntry.date === date)?.totalCalories)
    }

    function formattedDate(year: number, month: number, day:number): string{
        let monthToString: string;
        let dayToString: string;

        if(month > 9){
            monthToString = ""+month+1;
        }else{
            monthToString = "0"+(month+1)
        }

        if(day < 10){
            dayToString = "0"+day;
        }else{
            dayToString = ""+day;
        }

        return year+"-"+monthToString+"-"+dayToString;
    }

    function onClickCalendarDay(day: number){
        setClickedDate(formattedDate(month.year, month.month, day));
        setIsOpen(true);
    }

    return (
        <>
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
                    month.calendarDays.map(day => <CalendarDayCard key={day.day}
                                                                   calendarDay={day} isToday={isToday}
                                                                   percentage={getDiaryEntryCaloriesByDate(month.year, month.month, day.day)}
                                                                   clickCalendarDay={onClickCalendarDay}
                                                                   isLaterThanToday={isLaterThanToday}/>)
                }
                {
                    month.calendarDays[month.calendarDays.length - 1].weekday != 6 && fillWithNextDays(month.calendarDays[month.calendarDays.length - 1].weekday)
                }
            </div>
            <Drawer open={isOpen} onClose={() => setIsOpen(!isOpen)} anchor={"bottom"}>
                <DiaryEntryView date={clickedDate} diaryEntry={props.diaryEntries.find(diaryEntry => diaryEntry.date === clickedDate)} totalCalories={props.appUserCalories} onClickBack={() => setIsOpen(!isOpen)}/>
            </Drawer>
        </>
    );
}