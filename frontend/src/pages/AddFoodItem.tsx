import "./AddFoodItem.css"
import {useNavigate} from "react-router-dom";
import {AppUser} from "../types/AppUser.ts";
import {ChangeEvent, useEffect, useState} from "react";
import SearchComponent from "../components/SearchComponent.tsx";
import axios from "axios";
import {OpenFoodFactsProduct, OpenFoodFactsProducts} from "../types/OpenFoodFactsProducts.ts";
import OpenFoodFactsProductsGallery from "../components/OpenFoodFactsProductsGallery.tsx";
import {Badge, Box, Modal} from "@mui/material";
import SnackIcon from "../components/svg/meal-icons/SnackIcon.tsx";
// @ts-ignore
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import BreakfastIcon from "../components/svg/meal-icons/BreakfastIcon.tsx";
import LunchIcon from "../components/svg/meal-icons/LunchIcon.tsx";
import DinnerIcon from "../components/svg/meal-icons/DinnerIcon.tsx";
import {DiaryEntry, FoodItem} from "../types/Diary.ts";
import {getDateToday} from "../Utility.ts";
type AddFoodItemProps = {
    setCurrentRoute : (url:string) => void,
    setDiaryEntry : (diaryEntry : DiaryEntry | undefined) => void,
    mealType : string,
    appUser : AppUser
}
function AddFoodItem(props: Readonly<AddFoodItemProps>) {

    const navigate = useNavigate()
    const url = window.location.href;
    const regex = new RegExp(/^\d*$/)

    const [searchText, setSearchText] = useState<string>("")
    const [currentProducts, setCurrentProducts] = useState<OpenFoodFactsProducts | null>(null)
    const [badgeCount, setBadgeCount] = useState<number>(0)
    const [amount, setAmount] = useState<number>(0)
    const [foodItems, setFoodItems] = useState<FoodItem[]>([])
    const [selectedFoodItem, setSelectedFoodItem] = useState<OpenFoodFactsProduct>({id:"",nutriments:{energy:0, energyKcal100g:0, energyKcalServing:0}, name:"", servingSize: 0, servingUnit:""})
    const [openModalAddFoodItem, setOpenModalAddFoodItem] = useState(false);
    const handleCloseModalAddFoodItem = () => setOpenModalAddFoodItem(false);


    useEffect(() => {
        props.setCurrentRoute(url)
    }, []);

    function fetchOpenFoodFactsProducts(text : string){
        axios.get("/api/openfoodfacts/" + text)
            .then(response => setCurrentProducts(response.data))
            .catch(() => setCurrentProducts(null))
    }

    function updateDiaryEntry(newFoodItems: FoodItem[]){
        axios.put("/api/diaries/"+props.appUser.id+"/"+getDateToday(), newFoodItems)
            .then(response => props.setDiaryEntry(response.data))
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

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const value = event.target.value

        if (regex.test(value) && !value.startsWith("0")) {
            setAmount(Number(value));
            console.log(amount)
        }else{
            setAmount(0)
        }
    }

    function handleAddFoodItem(){
        const foodItemToStore:FoodItem = {
            name: selectedFoodItem.name,
            amount: amount,
            unit: "g",
            calories: (amount/100)*selectedFoodItem.nutriments.energyKcal100g,
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
            <div>
                <SearchComponent handleSearchText={setSearchText}/>
                <button onClick={() => fetchOpenFoodFactsProducts(searchText)}>Suchen</button>
            </div>
            <div className={"addfooditem-search-output"}>
                {currentProducts && <OpenFoodFactsProductsGallery
                    openFoodFactsProducts={currentProducts}
                    onClickAddButton={onClickAddButton}/>}
                {currentProducts === null && searchText !== "" && <h2>keine Produkte gefunden</h2>}
            </div>
            <Modal
                open={openModalAddFoodItem}
                onClose={handleCloseModalAddFoodItem}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <h2>{selectedFoodItem.name}</h2>
                    <div>
                        <div>
                            <label htmlFor={"amount"}>Menge: </label>
                            <input id={"amount"} onChange={handleChange} type={"number"} min={1} max={9999} pattern="\d*"/>
                            {
                                selectedFoodItem.servingUnit === null ?
                                    <span>g</span>
                                    :
                                    <span>{selectedFoodItem.servingUnit}</span>
                            }
                        </div>
                        <div>
                        </div>
                    </div>
                    <button onClick={handleAddFoodItem}>hinzufügen</button>
                </Box>
            </Modal>
        </div>
    );
}

export default AddFoodItem;