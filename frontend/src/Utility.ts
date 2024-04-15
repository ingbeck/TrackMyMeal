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

export function translateMealType(mealType : string) : string{
    switch (mealType){
        case "BREAKFAST":
            return "Frühstück"
        case "LUNCH":
            return "Mittagessen"
        case "DINNER":
            return "Abendessen"
        case "SNACK":
            return "Snack"
        default:
            return ""
    }
}
