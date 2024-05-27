import "./AddFoodItem.css"
import {useNavigate} from "react-router-dom";
import {AppUser} from "../types/AppUser.ts";
import {useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import axios from "axios";
import {OpenFoodFactsProduct, OpenFoodFactsProducts} from "../types/OpenFoodFactsProducts.ts";
import OpenFoodFactsProductsGallery from "../components/OpenFoodFactsProductsGallery.tsx";
import {Badge, Box, CircularProgress} from "@mui/material";
import SnackIcon from "../components/svg/meal-icons/SnackIcon.tsx";
// @ts-ignore
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import BreakfastIcon from "../components/svg/meal-icons/BreakfastIcon.tsx";
import LunchIcon from "../components/svg/meal-icons/LunchIcon.tsx";
import DinnerIcon from "../components/svg/meal-icons/DinnerIcon.tsx";
import {DiaryEntry, FoodItem} from "../types/Diary.ts";
import ModalAddFoodItem from "../components/modals/ModalAddFoodItem.tsx";
import ModalFoodItems from "../components/modals/ModalFoodItems.tsx";
import {v4 as uuidv4} from 'uuid';
import {translateMealType} from "../Utility.ts";

type AddFoodItemProps = {
    setCurrentRoute : (url:string) => void,
    currentDiaryEntry : DiaryEntry | undefined,
    updateDiaryEntry : (newFoodItem : FoodItem) => void,
    deleteFoodItem : (foodItemToDelete : FoodItem) => void,
    mealType : string,
    appUser : AppUser
}
function AddFoodItem(props: Readonly<AddFoodItemProps>) {

    const navigate = useNavigate()
    const url = window.location.href;

    const [searchText, setSearchText] = useState<string>("")
    const [currentProducts, setCurrentProducts] = useState<OpenFoodFactsProducts | null>(null)
    const [badgeCount, setBadgeCount] = useState<number>(0)
    const [amount, setAmount] = useState<number>(0)
    const [foodItems, setFoodItems] = useState<FoodItem[]>([])
    const [selectedFoodItem, setSelectedFoodItem] = useState<OpenFoodFactsProduct>({id:"",nutriments:{energy:0, energyKcal100g:0, energyKcalServing:0}, name:"", servingSize: 0, servingUnit:""})
    const [openModalAddFoodItem, setOpenModalAddFoodItem] = useState<boolean>(false);
    const [openModalFoodItems, setOpenModalFoodItems] = useState<boolean>(false);
    const [startSearch, setStartSearch] = useState<boolean>(false);

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [url]);

    useEffect(() => {
        if(props.currentDiaryEntry !== undefined){
            setFoodItems(props.currentDiaryEntry.foodItems.filter((foodItem) => foodItem.mealType === props.mealType))
            setBadgeCount(props.currentDiaryEntry.foodItems.filter((foodItem) => foodItem.mealType === props.mealType).length)
        }else{
            setBadgeCount(0)
            setOpenModalFoodItems(false)
            setFoodItems([])
        }
    }, [props.currentDiaryEntry]);

    function fetchOpenFoodFactsProducts(text : string){
        axios.get("/api/openfoodfacts/" + text)
            .then((response) => {
                setCurrentProducts(response.data);
                setStartSearch(false);
            })
            .catch(() => setCurrentProducts(null))
    }

    function setBadgeIcon(mealType : string) : ReactJSXElement{
        const iconSize:number = 32

        switch (mealType){
            case "BREAKFAST":
                return <BreakfastIcon width={iconSize} height={iconSize} fill={"black"}/>
            case "LUNCH":
                return <LunchIcon width={iconSize} height={iconSize} fill={"black"}/>
            case "DINNER":
                return <DinnerIcon width={iconSize} height={iconSize} fill={"black"}/>
            case "SNACK":
                return <SnackIcon width={iconSize} height={iconSize} fill={"black"}/>
        }
    }

    function onClickAddButton(selectedFoodItem:OpenFoodFactsProduct){
        setSelectedFoodItem(selectedFoodItem)
        setOpenModalAddFoodItem(true)
    }

    function handleAddFoodItem(){
        const foodItemToSave:FoodItem = {
            id:uuidv4(),
            name: selectedFoodItem.name,
            amount: amount,
            unit: "g",
            calories: (amount/100)*selectedFoodItem.nutriments.energyKcal100g,
            mealType: props.mealType
        }
        setOpenModalAddFoodItem(false)
        props.updateDiaryEntry(foodItemToSave)
    }

    function handleSubmitNewFoodItems(){
        navigate("/home/"+props.appUser.id)
    }

    function onClickBadgeIcon(){
        if(foodItems.length > 0){
            setOpenModalFoodItems(true);
        }
    }

    function onSearchClick() {
        if(searchText !== ""){
            fetchOpenFoodFactsProducts(searchText);
            setStartSearch(true);
            setCurrentProducts(null);
        }
    }

    return (
        <div className={"addfooditem"}>
            <button onClick={handleSubmitNewFoodItems}>←</button>
            <div className={"addfooditem-header-wrapper"}>
                <h1>{translateMealType(props.mealType)}</h1>
                <Badge badgeContent={badgeCount} color="primary" onClick={onClickBadgeIcon}>
                    {setBadgeIcon(props.mealType)}
                </Badge>
            </div>
            <div className={"search"}>
                <SearchComponent handleSearchText={setSearchText}/>
                <button onClick={onSearchClick} disabled={startSearch}>Suchen</button>
            </div>
            <div className={"addfooditem-search-output"}>
                {startSearch &&
                    <Box sx={{ display: 'flex', alignSelf: "center", marginTop: 4}}>
                        <CircularProgress />
                    </Box>}
                {currentProducts &&
                    currentProducts.products.length === 0
                    ?
                    <span className={"homescreen-meals-empty"}>Keine Produkte gefunden</span>
                    :
                    <OpenFoodFactsProductsGallery openFoodFactsProducts={currentProducts} onClickAddButton={onClickAddButton}/>
                }
            </div>
            <ModalAddFoodItem
                open={openModalAddFoodItem}
                handleClose={() => setOpenModalAddFoodItem(false)}
                setAmount={setAmount}
                selectedFoodItem={selectedFoodItem}
                addFoodItem={handleAddFoodItem}/>
            <ModalFoodItems
                open={openModalFoodItems}
                foodItems={foodItems}
                onClose={() => setOpenModalFoodItems(false)}
                deleteFoodItem={props.deleteFoodItem}
                mealType={props.mealType}/>
        </div>
    );
}

export default AddFoodItem;