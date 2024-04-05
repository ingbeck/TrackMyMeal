import {useEffect} from "react";
import {AppUser} from "../types/AppUser.ts";
import {useParams} from "react-router-dom";
import "./ProfileScreen.css"

type ProfileScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void,
    deleteUser : (id: string | undefined) => void,
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

    function deleteUser(){
        if (window.confirm("Möchtest du dein Profil endgültig löschen?"))
            props.deleteUser(params.id)
    }

    return (
        <div className={"profilescreen"}>
            <div className={"profilescreen-wrapper"}>
                <div className={"profilescreen-title-wrapper"}>
                    <img src={props.appUser.avatarUrl} className={"profilescreen-avatar"} alt={" "}/>
                    <h1>{props.appUser.name}</h1>
                    <button onClick={props.logout}>Logout</button>
                </div>
                <div className={"profilescreen-stats-wrapper"}>
                    <h2>Alter:</h2>
                    <p>{props.appUser.age}</p>
                    <h2>Größe:</h2>
                    <p>{props.appUser.height} cm</p>
                    <h2>Gewicht:</h2>
                    <p>{props.appUser.weight} kg</p>
                    <h2>Grundumsatz:</h2>
                    <p>{props.appUser.bmr} kcal</p>
                    <h2>Aktivitätslevel:</h2>
                    <p>{props.appUser.activityLevel}</p>
                </div>
                <button className={"profilescreen-btn-edit"}>Profil bearbeiten</button>
                <button onClick={deleteUser} className={"profilescreen-btn-edit"}>Profil löschen</button>
            </div>

        </div>

    );
}