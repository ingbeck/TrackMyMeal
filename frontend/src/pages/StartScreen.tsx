import "./StartScreen.css"
import Logo from "../assets/Logo.svg"
import GoogleLogo from "../assets/google.svg"
import {useEffect} from "react";

type StartScreenProps = {
    login: () => void,
    setCurrentRoute: (url:string) => void
}

export default function StartScreen(props: Readonly<StartScreenProps>) {

    const url = window.location.href;

    useEffect(() => {
        props.setCurrentRoute(url)
    }, []);

    return (
            <div className={"startpage"}>
                <div className={"startpage-wrapper"}>
                    <img src={Logo} className={"startpage-wrapper-logo"} alt={"Logo der App; eine Gabel, die von einem runden Fortschrittsbalken umgeben ist"}/>
                    <h1 className={"startpage-wrapper-text"}>Track My Meal</h1>
                    <button className={"btn-login"} onClick={props.login}>
                        <img src={GoogleLogo} alt={"Logo von Google"}/>
                        <span>Mit Google anmelden</span>
                    </button>
                </div>
            </div>
    );
}
