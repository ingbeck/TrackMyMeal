import "./AddFoodItem.css"
import {useNavigate} from "react-router-dom";
import {AppUser} from "../types/AppUser.ts";
import {useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import axios from "axios";
import {OpenFoodFactsProduct, OpenFoodFactsProducts} from "../types/OpenFoodFactsProducts.ts";
import OpenFoodFactsProductsGallery from "../components/OpenFoodFactsProductsGallery.tsx";
import {Badge, Box, Modal, Typography} from "@mui/material";
import SnackIcon from "../components/svg/meal-icons/SnackIcon.tsx";
// @ts-ignore
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import BreakfastIcon from "../components/svg/meal-icons/BreakfastIcon.tsx";
import LunchIcon from "../components/svg/meal-icons/LunchIcon.tsx";
import DinnerIcon from "../components/svg/meal-icons/DinnerIcon.tsx";
import {Diary, FoodItem} from "../types/Diary.ts";
import {getDateToday} from "../Utility.ts";

type AddFoodItemProps = {
    setCurrentRoute : (url:string) => void,
    setDiary : (diary:Diary) => void,
    mealType : string,
    appUser : AppUser
}
function AddFoodItem(props: Readonly<AddFoodItemProps>) {

    const navigate = useNavigate()
    const url = window.location.href;

    const [searchText, setSearchText] = useState<string>("")
    const [currentProducts, setCurrentProducts] = useState<OpenFoodFactsProducts | null>(null)
    const [badgeCount, setBadgeCount] = useState<number>(0)
    const [foodItems, setFoodItems] = useState<FoodItem[]>([])
    const [selectedFoodItem, setSelectedFoodItem] = useState<OpenFoodFactsProduct>({nutriments:{energy:0, energyKcal100g:0, energyKcalServing:0}, name:"", servingSize: 0, servingUnit:""})
    const [openModalAddFoodItem, setOpenModalAddFoodItem] = useState(false);
    const handleCloseModalAddFoodItem = () => setOpenModalAddFoodItem(false);


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

    function updateDiaryEntry(newFoodItems: FoodItem[]){
        axios.put("/api/diaries/"+props.appUser.id+"/"+getDateToday(), newFoodItems)
            .then(response => props.setDiary(response.data))
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

    function onClickAddButton(selectedFoodItem:OpenFoodFactsProduct){
        setSelectedFoodItem(selectedFoodItem)
        setOpenModalAddFoodItem(true)
    }

    function handleAddFoodItem(){
        const foodItemToStore:FoodItem = {
            name: selectedFoodItem.name,
            amount: 100,
            unit: "g",
            calories: 100,
            mealType: props.mealType
        }
        setBadgeCount(badgeCount+1)
        setOpenModalAddFoodItem(false)
        setFoodItems([...foodItems, foodItemToStore])
        console.log(foodItems)
    }

    function handleSubmitNewFoodItems(){
        updateDiaryEntry(foodItems)
        navigate("/home/"+props.appUser.id)
    }

    return (
        <div className={"addfooditem"}>
            <div className={"addfooditem-header-wrapper"}>
                <button onClick={handleSubmitNewFoodItems}>Zurück</button>
                <h1>{translateMealType(props.mealType)}</h1>
                <Badge badgeContent={badgeCount} color="primary">
                    {setBadgeIcon(props.mealType)}
                </Badge>
            </div>
            <SearchComponent handleSearchText={setSearchText}/>
            <div className={"addfooditem-search-output"}>
                {searchText !== "" && <OpenFoodFactsProductsGallery
                    openFoodFactsProducts={currentProducts}
                    onClickAddButton={onClickAddButton}/>}
            </div>
            <Modal
                open={openModalAddFoodItem}
                onClose={handleCloseModalAddFoodItem}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <button onClick={handleAddFoodItem}>hinzufügen</button>
                </Box>
            </Modal>
        </div>
    );
}

export default AddFoodItem;