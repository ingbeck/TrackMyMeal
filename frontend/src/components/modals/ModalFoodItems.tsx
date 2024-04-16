import {Box, Modal} from "@mui/material";
import FoodItemCard from "../cards/FoodItemCard.tsx";
import {FoodItem} from "../../types/Diary.ts";
import {translateMealType} from "../../Utility.ts";
import "./ModalFoodItem.css"

type ModalFoodItemsProps = {
    deleteFoodItem : (foodItemToDelete : FoodItem) => void,
    open : boolean,
    foodItems : FoodItem[],
    onClose : () => void,
    mealType: string
}


export default function ModalFoodItems(props: Readonly<ModalFoodItemsProps>) {

    return (
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    borderRadius: "16px",
                    boxShadow: 24,
                    p: 4,
                }}>
                    <div className={"modalFoodItem-header-wrapper"}>
                        <label className={"modalFoodItem-title"}>{translateMealType(props.mealType)}</label>
                        <span>{props.foodItems.length} Einträge</span>
                    </div>
                    {props.foodItems.map((foodItem) => <FoodItemCard key={foodItem.id} foodItem={foodItem} deleteFoodItem={props.deleteFoodItem}/>)}
                    <div className={"modalAddFoodItem-btn-wrapper"}>
                        <button className={"cancel"} style={{marginTop:8}} onClick={props.onClose}>Zurück</button>
                    </div>
                </Box>
            </Modal>
    );
}