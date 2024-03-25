import {Avatar, Button} from "@mui/material";
import "./StartScreen.css"

export default function StartScreen() {
    return (
        <>
            <div className={"startpage"}>
                <div className={"startpage-wrapper"}>
                    <h1>Track My Meal</h1>
                    <Avatar className={"startpage-wrapper-logo"}/>
                    <Button variant="contained">Login</Button>
                </div>
            </div>
        </>

    );
}
