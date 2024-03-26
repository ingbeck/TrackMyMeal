import {Avatar, Button} from "@mui/material";
import "./StartScreen.css"

type StartScreenProps = {
    login: () => void,
}

export default function StartScreen(props: Readonly<StartScreenProps>) {

    return (
        <>
            <div className={"startpage"}>
                <div className={"startpage-wrapper"}>
                    <Avatar className={"startpage-wrapper-logo"}/>
                    <h1 className={"startpage-wrapper-text"}>Track My Meal</h1>
                    <Button variant={"contained"} onClick={props.login}>Login</Button>
                </div>
            </div>
        </>

    );
}
