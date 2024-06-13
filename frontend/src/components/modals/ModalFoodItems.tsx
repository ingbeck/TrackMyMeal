import {Box, Modal} from "@mui/material";
import FoodItemCard from "../cards/FoodItemCard.tsx";
import {FoodItem} from "../../types/Diary.ts";
import {translateMealType} from "../../Utility/Utility.ts";
import "./ModalFoodItem.css"

type ModalFoodItemsProps = {
    deleteFoodItem? : (foodItemToDelete : FoodItem) => void,
    open : boolean,
    foodItems : FoodItem[],
    onClose : () => void,
    mealType: string,
    isHomescreen: boolean
}


export default function ModalFoodItems(props: Readonly<ModalFoodItemsProps>) {

    return (
        <>
            {
                props.foodItems.length !== 0
                &&
                <Modal
                    open={props.open}
                    onClose={props.onClose}
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
                                <label className={"modalFoodItem-title"}>{translateMealType(props.mealType)}</label>
                                {
                                    props.foodItems.length === 1
                                        ?
                                        <span>{props.foodItems.length} Eintrag</span>
                                        :
                                        <span>{props.foodItems.length} Einträge</span>
                                }
                            </div>
                            <div className={"modalFoodItem_foodItems-wrapper"}>
                            {props.foodItems.map((foodItem) => <FoodItemCard key={foodItem.id} foodItem={foodItem}
                                                                             isHomescreen={true}
                                                                             deleteFoodItem={props.deleteFoodItem}/>)}
                            </div>
                            <div className={"modalAddFoodItem-btn-wrapper"} style={{padding:"16px 24px 24px 24px"}}>
                                <button className={"cancel"}  onClick={props.onClose}>Zurück
                                </button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            }
        </>

    );
}