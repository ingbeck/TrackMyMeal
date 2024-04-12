import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Diary} from "../types/Diary.ts";
import "./HomeScreen.css"
import {AppUser} from "../types/AppUser.ts";
import {Backdrop, Box, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import BreakfastIcon from "../components/svg/meal-icons/BreakfastIcon.tsx";
import LunchIcon from "../components/svg/meal-icons/LunchIcon.tsx";
import DinnerIcon from "../components/svg/meal-icons/DinnerIcon.tsx";
import SnackIcon from "../components/svg/meal-icons/SnackIcon.tsx";

type HomeScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void,
    setCurrentMeal : (mealType : string) => void,
    appUser : AppUser,
    diary : Diary
}
export default function HomeScreen(props: Readonly<HomeScreenProps>) {

    const url = window.location.href;
    const params = useParams();
    const navigate = useNavigate();

    const [progress, setProgress] = useState<number>(0)
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [params.id]);

    useEffect(() => {
        props.getAppUser(params.id)
        console.log(props.appUser)
    }, [props.appUser.bmrWithActivity === 0]);

    useEffect(() => {
        calculateProgress(props.appUser.bmrWithActivity, 2000)
    }, [props.appUser.bmrWithActivity !== 0]);

    function calculateProgress(whole: number, part: number) {
        setProgress(part / whole)
    }

    function handleOpen(){
        setOpen(true);
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
        <div className={"homescreen"}>
            <h1>Heute</h1>
            <div className={"homescreen-dailyProgress"}>
                <h2>Ziel</h2>
                <div id={"progress"} className={"progressbar"}>
                    {props.appUser.bmrWithActivity !== 0 &&
                        <>
                            <div className={progress > 1 ? "progressbar-fill-overflow" : "progressbar-fill"}
                                 style={{flex: progress}}>
                                {progress > 0.25 && <span>2000 kcal</span>}
                            </div>
                            {progress < 0.25 && <span>2000 kcal</span>}
                        </>
                    }

                </div>
                <h3>{props.appUser.bmrWithActivity} kcal</h3>
            </div>
            <div>
                <h2>Deine Ernährung</h2>
                {
                    props.diary.diaryEntries.length === 0
                        ?
                        <p>Für heute hast du noch nichts hinzugefügt. Drücke auf das Plus, um Mahlzeiten
                            hinzuzufügen.</p>
                        :
                        <div>
                            Food Items
                        </div>
                }
            </div>
            <Box sx={{height: 330, transform: 'translateZ(0px)', flexGrow: 0.6}} className={"btn-add-food"}>
                    <Backdrop open={open} sx={{background:"none"}}/>
                    <SpeedDial
                        ariaLabel="SpeedDial tooltip example"
                        sx={{position: 'fixed', bottom: 16, right:1}}
                        icon={<SpeedDialIcon/>}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={open}
                    >
                        <SpeedDialAction icon={<BreakfastIcon width={20} height={20}/>} tooltipTitle={"Frühstück"} tooltipOpen onClick={()=> onActionClick("BREAKFAST")}/>
                        <SpeedDialAction icon={<LunchIcon width={20} height={20}/>} tooltipTitle={"Mittagessen"} tooltipOpen onClick={()=> onActionClick("LUNCH")}/>
                        <SpeedDialAction icon={<DinnerIcon width={20} height={20}/>} tooltipTitle={"Abendessen"} tooltipOpen onClick={()=> onActionClick("DINNER")}/>
                        <SpeedDialAction icon={<SnackIcon width={20} height={20}/>} tooltipTitle={"Snack"} tooltipOpen onClick={()=> onActionClick("SNACK")}/>
                    </SpeedDial>
            </Box>
        </div>
    );
}