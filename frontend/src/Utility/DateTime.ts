export function formattedDateCaption(date: Date): string {
    const formatter = new Intl.DateTimeFormat('de-DE', { month: 'long' });
    return formatter.format(date)+" "+date.getFullYear();
}

export function isCurrentMonth(date : Date): boolean{
    const now : Date = new Date();
    return ((date.getFullYear()) != now.getFullYear() || (date.getMonth() != now.getMonth()));
}