import {useEffect, useState} from "react";
import {AppUser} from "../../types/AppUser.ts";
import {Meal, MealToSaveDto} from "../../types/Meal.ts";
import SearchComponent from "../../components/SearchComponent.tsx";
import MealGallery from "../../components/MealGallery.tsx";
import AddButton from "../../components/svg/AddButton.tsx";

type MealsScreenProps = {
    setCurrentRoute : (url:string) => void,
    appUser: AppUser,
    addMealToDiary: (mealType: string, meal: MealToSaveDto) => void,
    deleteMeal: (id : string) => void,
    meals: Meal[]
}
export default function MealsPage(props: Readonly<MealsScreenProps>) {

    const url = window.location.href;
    const[searchText, setSearchText] = useState<string>("")
    const[isEditable, setIsEditable]=useState<boolean>(false)

    const filteredMeals = props.meals.filter((meal) => meal.name.toLowerCase().includes(searchText.toLowerCase()))

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    return (
        <div className={"page-container"}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <h1>Mahlzeiten</h1>
                <button onClick={() => setIsEditable(!isEditable)}>{isEditable ? "Fertig" : "Bearbeiten"}</button>
            </div>
            <SearchComponent handleSearchText={setSearchText}/>
            {
                isEditable
                &&
                <div className={"card"}>
                    <div className={"card-header"}>
                        <button style={{flexBasis:"100%"}}><AddButton width={40} height={40}/></button>
                    </div>
                </div>
            }
            <MealGallery meals={filteredMeals}
                         searchText={searchText}
                         addMealToDiary={props.addMealToDiary}
                         isEditable={isEditable}
                         deleteMeal={props.deleteMeal}/>
        </div>
    );
}