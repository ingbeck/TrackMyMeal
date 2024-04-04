import {useEffect} from "react";
import {AppUser} from "../types/AppUser.ts";
import {useParams} from "react-router-dom";
import "./ProfileScreen.css"

type ProfileScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void,
    logout : () => void,
    appUser : AppUser
}
export default function ProfileScreen(props: Readonly<ProfileScreenProps>) {

    const url = window.location.href;
    const params = useParams();

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    useEffect(() => {
        props.getAppUser(params.id)
    }, [props, params.id]);

    return (
        <div className={"profilescreen"}>
            <div className={"profilescreen-title-wrapper"}>
                <h1>Dein Profil</h1>
                <button onClick={props.logout}>Logout</button>
            </div>
            <p>Name: {props.appUser.name}</p>
            <p>Geschlecht: {props.appUser.gender}</p>
        </div>
    );
}