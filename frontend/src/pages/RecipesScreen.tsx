import {useEffect} from "react";

type RecipesScreenProps = {
    setCurrentRoute : (url:string) => void
}
export default function RecipesScreen(props: Readonly<RecipesScreenProps>) {

    const url = window.location.href;

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    return (
        <>
            <h1>Rezepte</h1>
        </>
    );
}