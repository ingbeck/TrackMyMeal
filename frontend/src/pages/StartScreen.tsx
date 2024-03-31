import "./StartScreen.css"

type StartScreenProps = {
    login: () => void,
}

export default function StartScreen(props: Readonly<StartScreenProps>) {

    return (
        <>
            <div className={"startpage"}>
                <div className={"startpage-wrapper"}>
                    <img src={"../src/assets/Logo.svg"} className={"startpage-wrapper-logo"} alt={"Logo der App; eine Gabel, die von einem runden Fortschrittsbalken umgeben ist"}/>
                    <h1 className={"startpage-wrapper-text"}>Track My Meal</h1>
                    <button className={"btn-login"} onClick={props.login}>
                        <img src={"../src/assets/google.svg"} alt={"Logo von Google"}/>
                        <span>Mit Google anmelden</span>
                    </button>
                </div>
            </div>
        </>

    );
}
