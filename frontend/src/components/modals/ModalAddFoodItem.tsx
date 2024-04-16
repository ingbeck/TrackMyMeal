import {Box, Modal} from "@mui/material";
import {OpenFoodFactsProduct} from "../../types/OpenFoodFactsProducts.ts";
import {ChangeEvent} from "react";
import "./ModalAddFoodItem.css"

type ModalAddFoodItemProps = {
    open : boolean,
    handleClose : () => void,
    setAmount : (amount : number) => void,
    selectedFoodItem : OpenFoodFactsProduct,
    addFoodItem : () => void
}

export default function ModalAddFoodItem(props: Readonly<ModalAddFoodItemProps>) {

    const regex = new RegExp(/^\d*$/)

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const value = event.target.value

        if (regex.test(value) && !value.startsWith("0")) {
            props.setAmount(Number(value));
        }else{
            props.setAmount(0)
        }
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
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
                    <div className={"modalAddFoodItem-header"}>
                        <h2>{props.selectedFoodItem.name}</h2>
                        {props.selectedFoodItem.servingSize !== 0
                            ?
                            <div>
                                <span className={"gradient"}><span className={"serving"}>{props.selectedFoodItem.servingSize !== 0 ? props.selectedFoodItem.nutriments.energyKcalServing : props.selectedFoodItem.nutriments.energyKcal100g}</span> kcal</span>
                                <span id={"servingsize"}>{" / "+ props.selectedFoodItem.servingSize} {props.selectedFoodItem.servingUnit ? props.selectedFoodItem.servingUnit : "g"}</span>
                            </div>
                            :
                            <span>100 g</span>
                        }
                    </div>
                    <div>
                        <div className={"select-amount-wrapper"}>
                            <input id={"amount"} className={"searchbar"} onChange={handleChange} type={"number"} min={1} max={9999}
                                   placeholder={props.selectedFoodItem.servingSize.toString()}
                                   pattern="\d*"/>
                            <span>Gramm</span>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className={"modalAddFoodItem-btn-wrapper"}>
                        <button onClick={props.addFoodItem} className={"add"}>Hinzufügen</button>
                        <button onClick={props.addFoodItem} className={"cancel"}>Abbrechen</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
