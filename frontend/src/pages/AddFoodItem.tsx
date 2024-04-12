import "./AddFoodItem.css"
import {useNavigate} from "react-router-dom";
import {AppUser} from "../types/AppUser.ts";
import {useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import axios from "axios";
import {OpenFoodFactsProducts} from "../types/OpenFoodFactsProducts.ts";
import OpenFoodFactsProductsGallery from "../components/OpenFoodFactsProductsGallery.tsx";
import {Badge} from "@mui/material";
import SnackIcon from "../components/svg/meal-icons/SnackIcon.tsx";
// @ts-ignore
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import BreakfastIcon from "../components/svg/meal-icons/BreakfastIcon.tsx";
import LunchIcon from "../components/svg/meal-icons/LunchIcon.tsx";
import DinnerIcon from "../components/svg/meal-icons/DinnerIcon.tsx";

type AddFoodItemProps = {
    setCurrentRoute : (url:string) => void,
    mealType : string,
    appUser : AppUser
}
function AddFoodItem(props: Readonly<AddFoodItemProps>) {

    const navigate = useNavigate()
    const url = window.location.href;

    const [searchText, setSearchText] = useState<string>("")
    const [currentProducts, setCurrentProducts] = useState<OpenFoodFactsProducts | null>(null)
    const [badgeCount, setBadgeCount] = useState<number>(0)


    useEffect(() => {
        props.setCurrentRoute(url)
    }, []);

    useEffect(() => {
        if(searchText !== ""){
            fetchOpenFoodFactsProducts(searchText)
        }
    }, [searchText]);

    function fetchOpenFoodFactsProducts(searchText : string){
        axios.get("/api/openfoodfacts/" + searchText)
            .then(response => setCurrentProducts(response.data))
        console.log(currentProducts)
    }

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

    function setBadgeIcon(mealType : string) : ReactJSXElement{
        const iconSize:number = 32

        switch (mealType){
            case "BREAKFAST":
                return <BreakfastIcon width={iconSize} height={iconSize}/>
            case "LUNCH":
                return <LunchIcon width={iconSize} height={iconSize}/>
            case "DINNER":
                return <DinnerIcon width={iconSize} height={iconSize}/>
            case "SNACK":
                return <SnackIcon width={iconSize} height={iconSize}/>
        }
    }

    return (
        <div className={"addfooditem"}>
            <div className={"addfooditem-header-wrapper"}>
                <button onClick={() => navigate("/home/"+props.appUser.id)}>Zurück</button>
                <h1>{translateMealType(props.mealType)}</h1>
                <Badge badgeContent={badgeCount} color="primary">
                    {setBadgeIcon(props.mealType)}
                </Badge>
            </div>
            <SearchComponent handleSearchText={setSearchText}/>
            <div className={"addfooditem-search-output"}>
                {searchText !== "" && <OpenFoodFactsProductsGallery openFoodFactsProducts={currentProducts} onClickAddButton={() => setBadgeCount(badgeCount+1)}/>}
            </div>
        </div>
    );
}

export default AddFoodItem;