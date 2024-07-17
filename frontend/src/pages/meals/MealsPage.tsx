import {ChangeEvent, useEffect, useState} from "react";
import {AppUser} from "../../types/AppUser.ts";
import {Meal, MealItem, MealToSaveDto} from "../../types/Meal.ts";
import SearchComponent from "../../components/SearchComponent.tsx";
import MealGallery from "../../components/MealGallery.tsx";
import AddButton from "../../components/svg/AddButton.tsx";
import "./MealPage.css"
import axios from "axios";
import {OpenFoodFactsProduct, OpenFoodFactsProducts} from "../../types/OpenFoodFactsProducts.ts";
import {v4 as uuidv4} from "uuid";
import ModalAddFoodItem from "../../components/modals/ModalAddFoodItem.tsx";
import ModalAddMealItem from "../../components/modals/ModalAddMealItem.tsx";
import EditButton from "../../components/svg/EditButton.tsx";
import CheckButton from "../../components/svg/CheckButton.tsx";
import ModalMealItems from "../../components/modals/ModalMealItems.tsx";

type MealsScreenProps = {
    setCurrentRoute : (url:string) => void,
    appUser: AppUser,
    addMealToDiary: (mealType: string, meal: MealToSaveDto) => void,
    addNewMeal: (mealToSave : MealToSaveDto) => void,
    deleteMeal: (id : string) => void,
    meals: Meal[],
    userHasMeals: boolean,
    checkIfUserHasMeals: () => void
}
export default function MealsPage(props: Readonly<MealsScreenProps>) {

    const url = window.location.href;
    const[searchText, setSearchText] = useState<string>("")
    const[searchTextProduct, setSearchTextProduct] = useState<string>("")
    const[isEditable, setIsEditable] = useState<boolean>(false)
    const[modalOpen, setModalOpen] = useState<boolean>(false);
    const[modalFoodItemOpen, setModalFoodItemOpen] = useState<boolean>(false);
    const[modalMealItemsOpen, setModalMealItemsOpen] = useState<boolean>(false);
    const[addButtonClicked, setAddButtonClicked] = useState<boolean>(false);
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

    useEffect(() => {
        if(props.meals.length < 1){
            props.checkIfUserHasMeals();
        }
    }, [props]);

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

    function deleteMealItem(mealItemToDelete: MealItem){
        const newMealItems = mealItems.filter(mealItem => mealItem.id !== mealItemToDelete.id);
        setMealItems(newMealItems);
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
                <button style={{background: "none", border:"none"}} onClick={handleEditButtonClick}>{isEditable ? <CheckButton width={40} height={40}/> : <EditButton width={40} height={40}/>}</button>
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
                                    <div className={"modalItems-btn_wrapper"} style={{gap:8}}>
                                        <button className={"addMealItems-btn"}
                                                onClick={() => setModalOpen(!modalOpen)}
                                                style={{flex: 1}}
                                        >Essen hinzufügen</button>
                                        <button className={"addMealItems-btn-add"} onClick={handleSubmitNewMeal}>Fertig</button>
                                    </div>
                                </>
                                :
                                <div className={"card-header"}>
                                    <button onClick={() => setAddButtonClicked(true)} style={{flex: 1}}>
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
                         renderMealItems={renderMealItems}
                         userHasMeals={props.userHasMeals}/>

            <ModalAddMealItem modalOpen={modalOpen}
                              badgeCount={badgeCount}
                              startSearch={startSearch}
                              onModalClose={onModalClose}
                              currentProducts={currentProducts}
                              onClickAddButton={onClickAddButton}
                              onSearchClick={onSearchClick}
                              setModalMealItemsOpen={setModalMealItemsOpen}
                              setSearchTextProduct={setSearchTextProduct}/>

            <ModalAddFoodItem open={modalFoodItemOpen}
                              handleClose={() => setModalFoodItemOpen(false)}
                              setAmount={setAmount}
                              selectedFoodItem={selectedFoodItem}
                              addFoodItem={handleAddMealItem}/>

            <ModalMealItems deleteMealItem={deleteMealItem}
                            open={modalMealItemsOpen}
                            mealItems={mealItems}
                            onClose={() => setModalMealItemsOpen(false)}/>
        </div>
    );
}