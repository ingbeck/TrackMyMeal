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
        <div className={"page-container"} style={{paddingTop: 100}}>
            <div className={"homescreen-meals"}>
                <div className={"homescreen-meals-empty"}>
                    <span>Coming soon and will be super awesome!</span>
                </div>
            </div>
        </div>
    );
}