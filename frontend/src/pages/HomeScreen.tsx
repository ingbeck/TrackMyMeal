import {useEffect} from "react";

type HomeScreenProps = {
        setCurrentRoute : (url:string) => void
}
export default function HomeScreen(props: Readonly<HomeScreenProps>) {

        const url = window.location.href;

        useEffect(() => {
                props.setCurrentRoute(url)
        }, [props, url]);

    return (
        <>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
            <h1>Heute</h1>
        </>
    );
}