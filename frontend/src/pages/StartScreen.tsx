import "./StartScreen.css"

type StartScreenProps = {
    login: () => void,
}

export default function StartScreen(props: Readonly<StartScreenProps>) {

    return (
        <>
            <div className={"startpage"}>
                <div className={"startpage-wrapper"}>
                    <img src={"../src/assets/Logo.svg"} className={"startpage-wrapper-logo"}/>
                    <h1 className={"startpage-wrapper-text"}>Track My Meal</h1>
                    <div className={"btn-login"} onClick={props.login} onKeyDown={props.login}>
                        <img src={"../src/assets/google.svg"}/>
                        <span>Mit Google anmelden</span>
                    </div>
                </div>
            </div>
        </>

    );
}
