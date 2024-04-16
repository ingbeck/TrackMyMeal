import "./StartScreen.css"
import Logo from "../assets/logo.png"
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
            <div className={"startpage-hero-wrapper"}>
                <div className={"image-hero"}></div>
                <div className={"logo-wrapper"}>
                    <img src={Logo} className={"image-logo"}
                         alt={"Logo der App"}/>
                </div>
            </div>
            <div className={"startpage-body-wrapper"}>
                <div className={"headline-wrapper"}>
                    <h1 className={"startpage-wrapper-text"}>Track My Meal</h1>
                    <p>Dein mobiles Kalorientagebuch für eine&nbsp;ausgewogene Ernährung</p>
                </div>
                <button className={"btn-login"} onClick={props.login}>
                    <img src={GoogleLogo} alt={"Logo von Google"}/>
                    <span>Mit Google anmelden</span>
                </button>
                <span>© 2024 Ingo Becker</span>
            </div>
        </div>
    );
}
