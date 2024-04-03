import {useEffect} from "react";

type HomeScreenProps = {
        setCurrentRoute : (url:string) => void
}
export default function HomeScreen(props: Readonly<HomeScreenProps>) {

        const url = window.location.href;

        useEffect(() => {
                props.setCurrentRoute(url)
                console.log(url)
        }, []);

    return (
        <>
            <h1>Home</h1>
        </>
    );
}