import {ChangeEvent, useEffect, useState} from "react";
import {AppUser} from "../../types/AppUser.ts";
import {Meal, MealItem, MealToSaveDto} from "../../types/Meal.ts";
import SearchComponent from "../../components/SearchComponent.tsx";
import MealGallery from "../../components/MealGallery.tsx";
import AddButton from "../../components/svg/AddButton.tsx";
import {Badge, Box, Modal} from "@mui/material";
import "./MealPage.css"
import axios from "axios";
import {OpenFoodFactsProduct, OpenFoodFactsProducts} from "../../types/OpenFoodFactsProducts.ts";
import OpenFoodFactsProductsGallery from "../../components/OpenFoodFactsProductsGallery.tsx";
import {FoodItem} from "../../types/Diary.ts";
import {v4 as uuidv4} from "uuid";
import ModalAddFoodItem from "../../components/modals/ModalAddFoodItem.tsx";

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
                    <div className={"card-header"}>
                        {
                            addButtonClicked
                                ?
                                <>
                                    <div style={{flexBasis: "100%"}}>
                                        <form>
                                            <input className={"searchbar"} placeholder={"Name"}
                                                   onChange={handleChange}/>
                                        </form>
                                        {
                                            mealItems.length > 0 && mealItems.map(mealItem => <span key={mealItem.id}>{mealItem.name}, </span>)
                                        }
                                        <div className={"modalAddFoodItem-btn-wrapper"}>
                                            <div style={{display:"flex", flexDirection:"column"}}>
                                                <Badge className={"addMealItems-btn"}
                                                       badgeContent={badgeCount}
                                                       color="primary" onClick={() => setModalOpen(!modalOpen)}
                                                >
                                                    Zutaten hinzufügen
                                                </Badge>
                                                <button className={"addMealItems-btn add"} style={{width:"auto"}}>Fertig</button>
                                            </div>

                                        </div>
                                    </div>
                                </>
                                :
                                <button onClick={() => setAddButtonClicked(true)} style={{flexBasis: "100%"}}><AddButton
                                    width={40} height={40}/></button>
                        }
                    </div>
                </div>
            }
            <MealGallery meals={filteredMeals}
                         searchText={searchText}
                         addMealToDiary={props.addMealToDiary}
                         isEditable={isEditable}
                         deleteMeal={props.deleteMeal}/>
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
                            <label className={"modalFoodItem-title"}>Produkt suchen</label>
                            <Badge badgeContent={badgeCount}
                                   color="primary"
                            >
                                Items
                            </Badge>
                        </div>
                        <div className={"search"}>
                            <SearchComponent handleSearchText={setSearchTextProduct}/>
                            <button onClick={onSearchClick} disabled={startSearch}>Suchen</button>
                        </div>
                        <div className={"modalFoodItem_foodItems-wrapper"}>
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