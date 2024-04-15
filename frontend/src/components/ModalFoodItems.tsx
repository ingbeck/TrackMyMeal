import {Box, Modal} from "@mui/material";
import FoodItemCard from "./FoodItemCard.tsx";
import {FoodItem} from "../types/Diary.ts";
import {translateMealType} from "../Utility.ts";

type ModalFoodItemsProps = {
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
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <h2>{translateMealType(props.mealType)}</h2>
                    {props.foodItems.map((foodItem) => <FoodItemCard foodItem={foodItem}/>)}
                </Box>
            </Modal>
    );
}