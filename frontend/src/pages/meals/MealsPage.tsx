import {useEffect, useState} from "react";
import {AppUser} from "../../types/AppUser.ts";
import {Meal} from "../../types/Meal.ts";
import SearchComponent from "../../components/SearchComponent.tsx";
import MealGallery from "../../components/MealGallery.tsx";

type MealsScreenProps = {
    setCurrentRoute : (url:string) => void,
    appUser: AppUser,
    addMealToDiary: (mealType: string, meal: Meal) => void
    meals: Meal[]
}
export default function MealsPage(props: Readonly<MealsScreenProps>) {

    const url = window.location.href;
    const[searchText, setSearchText] = useState<string>("")

    const filteredMeals = props.meals.filter((meal) => meal.name.toLowerCase().includes(searchText.toLowerCase()))

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    return (
        <div className={"page-container"}>
            <h1>Mahlzeiten</h1>
            <SearchComponent handleSearchText={setSearchText}/>
            <MealGallery meals={filteredMeals} searchText={searchText} addMealToDiary={props.addMealToDiary}/>
        </div>
    );
}