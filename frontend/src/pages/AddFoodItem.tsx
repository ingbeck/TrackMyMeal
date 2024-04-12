import "./AddFoodItem.css"
import {useNavigate} from "react-router-dom";
import {AppUser} from "../types/AppUser.ts";
import {useEffect} from "react";

type AddFoodItemProps = {
    setCurrentRoute : (url:string) => void,
    mealType : string,
    appUser : AppUser
}
function AddFoodItem(props: Readonly<AddFoodItemProps>) {

    const navigate = useNavigate()
    const url = window.location.href;

    useEffect(() => {
        props.setCurrentRoute(url)
    }, []);

    function translateMealType(mealType : string) : string{
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

    return (
        <div className={"addfooditem"}>
            <div className={"addfooditem-header-wrapper"}>
                <button onClick={() => navigate("/home/"+props.appUser.id)}>Zurück</button>
                <h1>{translateMealType(props.mealType)}</h1>
                <label>Warenkorb</label>
            </div>
        </div>
    );
}

export default AddFoodItem;