import "./AddFoodItem.css"
import {useNavigate} from "react-router-dom";
import {AppUser} from "../types/AppUser.ts";

type AddFoodItemProps = {
    mealType : string,
    appUser : AppUser
}
function AddFoodItem(props: Readonly<AddFoodItemProps>) {

    const navigate = useNavigate()

    return (
        <div className={"addfooditem"}>
            <div className={"addfooditem-header-wrapper"}>
                <button onClick={() => navigate("/home/"+props.appUser.id)}>Zurück</button>
                <h1>Essen hinzufügen</h1>
                <label>{props.mealType}</label>
            </div>
        </div>
    );
}

export default AddFoodItem;