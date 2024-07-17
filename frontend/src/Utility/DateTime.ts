export function getDateToday():string{
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const yyyy = today.getFullYear()

    let dd:string = day.toString();
    let mm:string = month.toString();

    if (day < 10) {
        dd = '0' + day;
    }

    if (month < 10) {
        mm = '0' + month;
    }

    return yyyy+"-"+mm+"-"+dd;
}


export function formattedDateCaption(date: Date): string {
    const formatter = new Intl.DateTimeFormat('de-DE', { month: 'long' });
    return formatter.format(date)+" "+date.getFullYear();
}

export function isCurrentMonth(date : Date): boolean{
    const now : Date = new Date();
    return ((date.getFullYear()) != now.getFullYear() || (date.getMonth() != now.getMonth()));
}