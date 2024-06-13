import {useEffect, useState} from "react";
import {AppUser} from "../../types/AppUser.ts";
import {Meal} from "../../types/Meal.ts";
import axios from "axios";
import SearchComponent from "../../components/SearchComponent.tsx";
import MealGallery from "../../components/MealGallery.tsx";
type MealsScreenProps = {
    setCurrentRoute : (url:string) => void,
    appUser: AppUser
}
export default function MealsPage(props: Readonly<MealsScreenProps>) {

    const url = window.location.href;
    const initialMeals:Meal[] = [{id:"", userId:"", name:"", mealItems:[], totalCalories: 0}]
    const[searchText, setSearchText] = useState<string>("")
    const[meals, setMeals] = useState<Meal[]>(initialMeals)

    const filteredMeals = meals.filter((meal) => meal.name.toLowerCase().includes(searchText.toLowerCase()))

    useEffect(() => {
        if(props.appUser.id !== "") {
            getMealsByUserId(props.appUser.id)
        }
    }, [props.appUser.id]);


    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    function getMealsByUserId(id: string |undefined){
        axios.get("/api/meals/"+id)
            .then(response => setMeals(response.data))
            .catch(error => console.log(error.message));
    }

    return (
        <div className={"page-container"}>
            <h1>Mahlzeiten</h1>
            <SearchComponent handleSearchText={setSearchText}/>
            <MealGallery meals={filteredMeals} searchText={searchText}/>
        </div>
    );
}