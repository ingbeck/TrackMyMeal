export type CalendarMonth = {
    year: number,
    month : number,
    calendarDays : CalendarDay[]
}

export type CalendarDay = {
    day: number,
    weekday: number
}