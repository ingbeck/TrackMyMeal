import "./StartPage.css"
import Logo from "../../assets/logo.png"
import GoogleLogo from "../../assets/google.svg"
import {ChangeEvent, useEffect, useState} from "react";
import DesktopStartPage from "./DesktopStartPage.tsx";
import {useNavigate} from "react-router-dom";
import {Drawer} from "@mui/material";
import axios from "axios";

type StartScreenProps = {
    login: () => void,
    setCurrentRoute: (url:string) => void,
    createDemoUser?: (name: string) => void,
    isDemo: boolean
}

type FormLoginInput = {
    username:string,
    password:string
}

export default function StartPage(props: Readonly<StartScreenProps>) {

    const url = window.location.href;
    const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);
    const navigate = useNavigate()

    const[loginIsOpen, setLoginIsOpen] = useState<boolean>(false)
    const[formData, setFormData] = useState<FormLoginInput>({username:"", password:""})
    const[accountAuthorized, setAccountAuthorized] = useState<boolean>(false)

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    function checkIfAccountIsAuthorized(){
        axios.get("/api/demo/login/"+formData.username+"/"+formData.password)
            .then(response => setAccountAuthorized(response.data))
            .catch(error => console.log(error.message))
    }

    function loginDemo(){
            if(props.createDemoUser){
                props.createDemoUser(formData.username)
                navigate("/home")
            }
    }

    function handleSubmit(e: { preventDefault: () => void; }){
        e.preventDefault()

        if(accountAuthorized){
            loginDemo()
        }else{
            window.alert("Account nicht autorisiert!")
        }

    }

    function onClose(){
        setLoginIsOpen(false);
        setFormData({username: "", password:""});
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        const name = event.target.name;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <>
            {
                isMobile
                    ?
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
                            {
                                props.isDemo
                                    ?
                                    <button className={"btn-login"} onClick={() => setLoginIsOpen(true)}>
                                        Login
                                    </button>
                                    :
                                    <button className={"btn-login"} onClick={props.login}>
                                        <img src={GoogleLogo} alt={"Logo von Google"}/><span>Mit Google anmelden</span>
                                    </button>
                            }
                            <span className={"copyright"}>© 2024 Ingo Becker</span>
                        </div>
                    </div>
                    :
                    <DesktopStartPage/>
            }
            <Drawer open={loginIsOpen} onClose={onClose} anchor={"bottom"}>
                <form className={"login-wrapper"} onSubmit={handleSubmit}>
                    <div  className={"modalAddFoodItem-btn-wrapper"}>
                        <input className={"searchbar"}
                               placeholder={"Username"}
                               name={"username"}
                               onChange={handleInputChange}/>
                        <input className={"searchbar"}
                               placeholder={"Passwort"}
                               name={"password"}
                               onChange={handleInputChange}
                               type={"password"}/>
                        <button className={"add"} onClick={checkIfAccountIsAuthorized}>Los geht's!</button>
                    </div>
                </form>
            </Drawer>
        </>
    );
}
