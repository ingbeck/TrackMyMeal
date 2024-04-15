import {Box, Modal} from "@mui/material";
import {OpenFoodFactsProduct} from "../types/OpenFoodFactsProducts.ts";
import {ChangeEvent} from "react";

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
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <h2>{props.selectedFoodItem.name}</h2>
                    <div>
                        <div>
                            <label htmlFor={"amount"}>Menge: </label>
                            <input id={"amount"} onChange={handleChange} type={"number"} min={1} max={9999} pattern="\d*"/>
                            {
                                props.selectedFoodItem.servingUnit === null ?
                                    <span>g</span>
                                    :
                                    <span>{props.selectedFoodItem.servingUnit}</span>
                            }
                        </div>
                        <div>
                        </div>
                    </div>
                    <button onClick={props.addFoodItem}>hinzufügen</button>
                </Box>
            </Modal>
        </div>
    );
}
