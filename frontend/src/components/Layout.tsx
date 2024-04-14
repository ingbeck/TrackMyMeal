import {ReactNode, useState} from "react";
import Navbar from "./Navbar.tsx";
import {AppUser} from "../types/AppUser.ts";
import {Backdrop, Box, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import BreakfastIcon from "./svg/meal-icons/BreakfastIcon.tsx";
import LunchIcon from "./svg/meal-icons/LunchIcon.tsx";
import DinnerIcon from "./svg/meal-icons/DinnerIcon.tsx";
import SnackIcon from "./svg/meal-icons/SnackIcon.tsx";
import {useNavigate} from "react-router-dom";
import "./Layout.css"

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

    function handleClick(){
        setOpen(!open);
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
            <main>
                {props.children}
            </main>
            <div>
                {
                    props.currentRoute === homeScreen &&
                    <Box sx={{height: 330, transform: 'translateZ(0px)', flexGrow: 0.6}} className={"btn-add-food"}>
                        <Backdrop open={open} sx={{background:"none"}}/>
                        <SpeedDial
                            ariaLabel="SpeedDial tooltip example"
                            sx={{}}
                            icon={<SpeedDialIcon/>}
                            onClick={handleClick}
                            open={open}
                        >
                            <SpeedDialAction icon={<BreakfastIcon width={20} height={20}/>} tooltipTitle={"Frühstück"} tooltipOpen onClick={()=> onActionClick("BREAKFAST")}/>
                            <SpeedDialAction icon={<LunchIcon width={20} height={20}/>} tooltipTitle={"Mittagessen"} tooltipOpen onClick={()=> onActionClick("LUNCH")}/>
                            <SpeedDialAction icon={<DinnerIcon width={20} height={20}/>} tooltipTitle={"Abendessen"} tooltipOpen onClick={()=> onActionClick("DINNER")}/>
                            <SpeedDialAction icon={<SnackIcon width={20} height={20}/>} tooltipTitle={"Snack"} tooltipOpen onClick={()=> onActionClick("SNACK")}/>
                        </SpeedDial>
                    </Box>
                }
                {isInApp && <Navbar currentRoute={props.currentRoute} appUrl={props.appUrl} appUser={props.appUser}/>}
            </div>

        </div>
    );
}