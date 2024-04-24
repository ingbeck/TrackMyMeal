import {ReactNode, useEffect, useState} from "react";
import Navbar from "./Navbar.tsx";
import {AppUser} from "../types/AppUser.ts";
import {Backdrop, Box, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "./Layout.css"
import BreakfastButton from "./svg/meal-icons/BreakfastButton.tsx";
import LunchButton from "./svg/meal-icons/LunchButton.tsx";
import DinnerButton from "./svg/meal-icons/DinnerButton.tsx";
import SnackButton from "./svg/meal-icons/SnackButton.tsx";

type LayoutProps = {
    setCurrentMeal : (mealType : string) => void,
    children: ReactNode,
    currentRoute: string,
    appUrl : string,
    appUser : AppUser
}

export default function Layout(props: Readonly<LayoutProps>) {

    const startScreen:string = props.appUrl + "/"
    const regScreen:string = props.appUrl + "/registration/" + props.appUser.id
    const addFoodItemScreen = props.appUrl + "/add-food-item"
    const homeScreen:string = props.appUrl + "/home/" + props.appUser.id
    const isInApp = props.currentRoute != startScreen && props.currentRoute != regScreen  && props.currentRoute != addFoodItemScreen
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [isFirstLoaded, setIsFirstLoaded] = useState<boolean>(false);

    useEffect(() => {
        setIsFirstLoaded(false);
    }, [props.currentRoute]);

    function handleClick(){
        setIsFirstLoaded(true)
        setOpen(!open);
    }

    function handleClose(){
        setOpen(false);
    }

    function onActionClick(mealType:string){
        switch (mealType){
            case "BREAKFAST":
                props.setCurrentMeal("BREAKFAST");
                break;
            case "LUNCH":
                props.setCurrentMeal("LUNCH");
                break;
            case "DINNER":
                props.setCurrentMeal("DINNER");
                break;
            case "SNACK":
                props.setCurrentMeal("SNACK");
                break;
        }
        setOpen(false);
        navigate("/add-food-item")
    }

    return (
        <div>
            {
                (props.currentRoute === homeScreen && isFirstLoaded) &&
                <>
                    {open ? <div className={"transparent"}></div> : <div className={"transparent-fadeout"}></div>}
                </>
            }
            <main>
                {props.children}
            </main>
            <div>
            {
                    props.currentRoute === homeScreen &&
                    <Box sx={{height: 330, transform: 'translateZ(0px)', flexGrow: 0.6}} className={"btn-add-food"}>
                        <Backdrop open={open} sx={{background:"none"}} />
                        <SpeedDial
                            ariaLabel="SpeedDial tooltip example"
                            icon={<SpeedDialIcon />}
                            onClick={handleClick}
                            onClose={handleClose}
                            open={open}
                        >
                            <SpeedDialAction icon={<BreakfastButton width={40} height={40}/>} tooltipTitle={"Frühstück"} tooltipOpen onClick={()=> onActionClick("BREAKFAST")}/>
                            <SpeedDialAction icon={<LunchButton width={40} height={40}/>} tooltipTitle={"Mittagessen"} tooltipOpen onClick={()=> onActionClick("LUNCH")}/>
                            <SpeedDialAction icon={<DinnerButton width={40} height={40}/>} tooltipTitle={"Abendessen"} tooltipOpen onClick={()=> onActionClick("DINNER")}/>
                            <SpeedDialAction icon={<SnackButton width={40} height={40}/>} tooltipTitle={"Snack"} tooltipOpen onClick={()=> onActionClick("SNACK")}/>
                        </SpeedDial>
                    </Box>
                }
                {isInApp && <Navbar currentRoute={props.currentRoute} appUrl={props.appUrl} appUser={props.appUser}/>}
            </div>
        </div>
    );
}