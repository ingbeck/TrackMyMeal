import {Badge, Box, CircularProgress, Modal} from "@mui/material";
import {OpenFoodFactsProduct, OpenFoodFactsProducts} from "../../types/OpenFoodFactsProducts.ts";
import "./ModalAddFoodItem.css"
import RecipeIcon from "../../assets/menu-icons/icon_recipe.svg";
import SearchComponent from "../SearchComponent.tsx";
import OpenFoodFactsProductsGallery from "../OpenFoodFactsProductsGallery.tsx";

type ModalAddMealItemProps = {
    modalOpen : boolean,
    badgeCount : number,
    startSearch : boolean,
    onModalClose : () => void,
    currentProducts : OpenFoodFactsProducts | null,
    onClickAddButton : (selectedFoodItem: OpenFoodFactsProduct) => void,
    onSearchClick : () => void,
    setModalMealItemsOpen : (open: boolean) => void,
    setSearchTextProduct : (text: string) => void
}

export default function ModalAddFoodItem(props: Readonly<ModalAddMealItemProps>) {

    return (
        <Modal open={props.modalOpen}
               onClose={props.onModalClose}
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
                        <Badge badgeContent={props.badgeCount}
                               color="primary"
                               onClick={() => props.setModalMealItemsOpen(true)}
                        >
                            <img src={RecipeIcon} alt={""}/>
                        </Badge>
                    </div>
                    <div className={"search"} style={{margin:"16px 24px 8px 24px"}}>
                        <SearchComponent handleSearchText={props.setSearchTextProduct}/>
                        <button onClick={props.onSearchClick} disabled={props.startSearch}>Suchen</button>
                    </div>
                    <div className={"modalFoodItem_foodItems-wrapper"}>
                        {
                            props.startSearch &&
                            <Box sx={{ display: 'flex', justifyContent: "center"}}>
                                <CircularProgress />
                            </Box>
                        }
                        {props.currentProducts &&
                        props.currentProducts.products.length === 0
                            ?
                            <span className={"homescreen-meals-empty"}>Keine Produkte gefunden</span>
                            :
                            <OpenFoodFactsProductsGallery openFoodFactsProducts={props.currentProducts} onClickAddButton={props.onClickAddButton}/>}
                    </div>
                    <div className={"modalAddFoodItem-btn-wrapper"} style={{padding: "16px 24px 24px 24px"}}>
                        <button className={"cancel"}
                                onClick={props.onModalClose}>
                            Zurück
                        </button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
