export function highlightSearchText(searchText : string, elementToHighlightId : string) {
    const textToSearch: string = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern: RegExp = new RegExp(textToSearch, "gi");
    const elementToReplace = document.getElementById(elementToHighlightId)

    if (elementToReplace?.textContent) {
        if (textToSearch !== "") {
            elementToReplace.innerHTML = elementToReplace.textContent.replace(pattern, match => `<mark>${match}</mark>`)
        } else {
            elementToReplace.innerHTML = elementToReplace.textContent.replace(textToSearch, "")
        }
    }
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

export function getBackgroundColor(mealType : string) : string {
    switch (mealType){
        case "BREAKFAST":
            return "#4A30FF"
        case "LUNCH":
            return "#9018FE"
        case "DINNER":
            return "#C009FC"
        case "SNACK":
            return "#E33EFB"
        default:
            return ""
    }
}
