import {ChangeEvent, useEffect, useState} from "react";
import {AppUser} from "../../types/AppUser.ts";
import {Meal, MealItem, MealToSaveDto} from "../../types/Meal.ts";
import SearchComponent from "../../components/SearchComponent.tsx";
import MealGallery from "../../components/MealGallery.tsx";
import AddButton from "../../components/svg/AddButton.tsx";
import {Badge, Box, CircularProgress, Modal} from "@mui/material";
import "./MealPage.css"
import axios from "axios";
import {OpenFoodFactsProduct, OpenFoodFactsProducts} from "../../types/OpenFoodFactsProducts.ts";
import OpenFoodFactsProductsGallery from "../../components/OpenFoodFactsProductsGallery.tsx";
import {v4 as uuidv4} from "uuid";
import ModalAddFoodItem from "../../components/modals/ModalAddFoodItem.tsx";

type MealsScreenProps = {
    setCurrentRoute : (url:string) => void,
    appUser: AppUser,
    addMealToDiary: (mealType: string, meal: MealToSaveDto) => void,
    addNewMeal: (mealToSave : MealToSaveDto) => void,
    deleteMeal: (id : string) => void,
    meals: Meal[]
}
export default function MealsPage(props: Readonly<MealsScreenProps>) {

    const url = window.location.href;
    const[searchText, setSearchText] = useState<string>("")
    const[searchTextProduct, setSearchTextProduct] = useState<string>("")
    const[isEditable, setIsEditable] = useState<boolean>(false)
    const[modalOpen, setModalOpen] = useState<boolean>(false);
    const[modalFoodItemOpen, setModalFoodItemOpen] = useState<boolean>(false);
    const[addButtonClicked, setAddButtonClicked] = useState<boolean>(false)
    const[mealName, setMealName] = useState<string>("")
    const[mealItems, setMealItems] = useState<MealItem[]>([])
    const[currentProducts, setCurrentProducts] = useState<OpenFoodFactsProducts | null>(null)
    const[selectedFoodItem, setSelectedFoodItem] = useState<OpenFoodFactsProduct>({id:"",nutriments:{energy:0, energyKcal100g:0, energyKcalServing:0}, name:"", servingSize: 0, servingUnit:""})
    const[startSearch, setStartSearch] = useState<boolean>(false)
    const[amount, setAmount] = useState<number>(0)

    const badgeCount = mealItems.length
    const filteredMeals = props.meals.filter((meal) => meal.name.toLowerCase().includes(searchText.toLowerCase()))

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    function handleEditButtonClick(){
        setIsEditable(!isEditable);
        setAddButtonClicked(false);
        if(isEditable){
            setMealItems([]);
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        setMealName(value);
    }

    function fetchOpenFoodFactsProducts(text : string){
        axios.get("/api/openfoodfacts/" + text)
            .then((response) => {
                setCurrentProducts(response.data);
                setStartSearch(false);
            })
            .catch(() => setCurrentProducts(null))
    }

    function onSearchClick() {
        if(searchTextProduct !== ""){
            fetchOpenFoodFactsProducts(searchTextProduct);
            setStartSearch(true);
            setCurrentProducts(null);
        }
    }

    function onModalClose(){
        setModalOpen(!modalOpen);
        setStartSearch(false);
        setCurrentProducts(null);
    }

    function onClickAddButton(selectedFoodItem:OpenFoodFactsProduct){
        setSelectedFoodItem(selectedFoodItem)
        setModalFoodItemOpen(true)
    }

    function handleAddMealItem(){
        const mealItemToSave:MealItem = {
            id:uuidv4(),
            name: selectedFoodItem.name,
            amount: amount,
            unit: "g",
            calories: (amount/100)*selectedFoodItem.nutriments.energyKcal100g,
            energyKcal100: selectedFoodItem.nutriments.energyKcal100g
        };
        setModalFoodItemOpen(false);
        setMealItems([...mealItems, mealItemToSave]);
    }

    function renderMealItems(numberItemsToRender: number, mealItems: MealItem[]){
        let mealItemsToRender : MealItem[];
        let numberCommas : number;

        if(mealItems.length > numberItemsToRender){
            mealItemsToRender = mealItems.slice(0,numberItemsToRender);
            numberCommas = numberItemsToRender+1;
        }else{
            mealItemsToRender =mealItems;
            numberCommas = mealItems.length;
        }

        return mealItemsToRender.map((mealItem, count) => {
                count++;
                return <span key={mealItem.id} className={"meal_mealItem"}>{mealItem.name}{count < numberCommas && ","}</span>
            }
        )
    }

    function getTotalCalories(mealItems: MealItem[]){
        return Math.floor(
            mealItems.reduce(
                function (sum, mealItem)
                { return sum + mealItem.calories; }, 0)
        )
    }

    function handleSubmitNewMeal(){
        if(mealName.length !== 0 && mealItems.length !== 0){
            const mealToSave : MealToSaveDto = {name:mealName, mealItems:mealItems}
            props.addNewMeal(mealToSave);
            setAddButtonClicked(false);
            setMealItems([]);
            setMealName("");
        }else{
            window.alert("Die Mahlzeit muss einen Namen haben und es muss mindestens eine Zutat hinzugefügt werden")
        }
    }


    return (
        <div className={"page-container"}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <h1>Mahlzeiten</h1>
                <button onClick={handleEditButtonClick}>{isEditable ? "Fertig" : "Bearbeiten"}</button>
            </div>
            <SearchComponent handleSearchText={setSearchText}/>
            {
                isEditable
                &&
                <div className={"card"}>
                        {
                            addButtonClicked
                                ?
                                <>
                                    <div className={"card-header"}>
                                        <div style={{flexBasis: "100%"}}>
                                            <form>
                                                <input className={"searchbar"} placeholder={"Name"}
                                                       onChange={handleChange} required/>
                                            </form>
                                        </div>
                                    </div>
                                    {
                                        mealItems.length !== 0
                                        &&
                                        <>
                                            <span className={"gradient"} style={{paddingTop:"16px"}}><span
                                                className={"serving"}>{getTotalCalories(mealItems)}</span> kcal</span>
                                            <div className={"meal_mealItem-wrapper divider-top"}>
                                                {renderMealItems(3, mealItems)}
                                                {mealItems.length > 3 &&
                                                    <span className={"meal_mealItem"}>...</span>}
                                            </div>
                                        </>
                                    }
                                    <div className={"modalItems-btn_wrapper"}>
                                        <Badge className={"addMealItems-btn"}
                                               badgeContent={badgeCount}
                                               color="primary" onClick={() => setModalOpen(!modalOpen)}
                                        >Zutaten hinzufügen</Badge>
                                        <button className={"addMealItems-btn-add"} onClick={handleSubmitNewMeal}>Fertig</button>
                                    </div>
                                </>
                                :
                                <div className={"card-header"}>
                                    <button onClick={() => setAddButtonClicked(true)} style={{flexBasis: "100%"}}>
                                        <AddButton width={40} height={40}/></button>
                                </div>
                        }

                </div>
            }
            <MealGallery meals={filteredMeals}
                         searchText={searchText}
                         addMealToDiary={props.addMealToDiary}
                         isEditable={isEditable}
                         deleteMeal={props.deleteMeal}
                         renderMealItems={renderMealItems}/>
            <ModalAddFoodItem
                open={modalFoodItemOpen}
                handleClose={() => setModalFoodItemOpen(false)}
                setAmount={setAmount}
                selectedFoodItem={selectedFoodItem}
                addFoodItem={handleAddMealItem}/>
            <Modal open={modalOpen}
                   onClose={onModalClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
                   style={{margin:"0 16px 0 16px"}}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "100%",
                    bgcolor: 'background.paper',
                    borderRadius: "16px",
                    boxShadow: 24,
                    p: 4,
                    padding:0
                }}>
                    <div>
                        <div className={"modalFoodItem-header-wrapper"}>
                            <h1 className={"modalFoodItem-title"}>Produkt suchen</h1>
                            <Badge badgeContent={badgeCount}
                                   color="primary"
                            >
                                Items
                            </Badge>
                        </div>
                        <div className={"search"} style={{margin:"16px 24px 8px 24px"}}>
                            <SearchComponent handleSearchText={setSearchTextProduct}/>
                            <button onClick={onSearchClick} disabled={startSearch}>Suchen</button>
                        </div>
                        <div className={"modalFoodItem_foodItems-wrapper"}>
                            {
                                startSearch &&
                                <Box sx={{ display: 'flex', justifyContent: "center"}}>
                                    <CircularProgress />
                                </Box>
                            }
                            {currentProducts &&
                            currentProducts.products.length === 0
                                ?
                                <span className={"homescreen-meals-empty"}>Keine Produkte gefunden</span>
                                :
                                <OpenFoodFactsProductsGallery openFoodFactsProducts={currentProducts} onClickAddButton={onClickAddButton}/>}
                        </div>
                        <div className={"modalAddFoodItem-btn-wrapper"} style={{padding: "16px 24px 24px 24px"}}>
                            <button className={"cancel"}
                                    onClick={onModalClose}>
                                Zurück
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}