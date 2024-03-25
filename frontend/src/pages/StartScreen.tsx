import {Avatar, Button} from "@mui/material";
import "./StartScreen.css"

export default function StartScreen() {
    return (
        <>
            <div className={"startpage"}>
                <div className={"startpage-wrapper"}>
                    <Avatar className={"startpage-wrapper-logo"}/>
                    <h1 className={"startpage-wrapper-text"}>Track My Meal</h1>
                    <Button variant="contained">Login</Button>
                </div>
            </div>
        </>

    );
}
