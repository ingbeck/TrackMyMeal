import {Box, Modal} from "@mui/material";
import "./ModalFoodItem.css"
import {MealItem} from "../../types/Meal.ts";
import MealItemCard from "../cards/MealItemCard.tsx";

type ModalMealItemsProps = {
    deleteMealItem : (mealItemToDelete : MealItem) => void,
    open : boolean,
    mealItems : MealItem[],
    onClose : () => void
}


export default function ModalMealItems(props: Readonly<ModalMealItemsProps>) {

    return (
        <>
            {
                props.mealItems.length !== 0
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
                                <label className={"modalFoodItem-title"}>Produkte</label>
                                {
                                    props.mealItems.length === 1
                                        ?
                                        <span>{props.mealItems.length} Eintrag</span>
                                        :
                                        <span>{props.mealItems.length} Einträge</span>
                                }
                            </div>
                            <div className={"modalFoodItem_foodItems-wrapper"}>
                                {props.mealItems.map((mealItem) => <MealItemCard key={mealItem.id} mealItem={mealItem}
                                                                                 deleteMealItem={props.deleteMealItem}/>)}
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