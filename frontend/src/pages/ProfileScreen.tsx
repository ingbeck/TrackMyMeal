import {useEffect} from "react";

type ProfileScreenProps = {
    setCurrentRoute : (url:string) => void
}
export default function ProfileScreen(props: Readonly<ProfileScreenProps>) {

    const url = window.location.href;

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    return (
        <>
            <h1>Profil</h1>
        </>
    );
}