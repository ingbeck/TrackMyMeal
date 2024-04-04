import {useEffect} from "react";
import {AppUser} from "../types/AppUser.ts";
import {useParams} from "react-router-dom";

type ProfileScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void
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
        <>
            <h1>Profil</h1>
            <p>Name: {props.appUser.name}</p>
            <p>Geschlecht: {props.appUser.gender}</p>
        </>
    );
}