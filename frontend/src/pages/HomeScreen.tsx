import {useEffect} from "react";
import {useParams} from "react-router-dom";

type HomeScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void
}
export default function HomeScreen(props: Readonly<HomeScreenProps>) {

        const url = window.location.href;
        const params = useParams();

        useEffect(() => {
                props.setCurrentRoute(url)
        }, [props, url]);

    useEffect(() => {
        props.getAppUser(params.id)
    }, [params.id]);

    return (
        <h1>
                Heute
        </h1>
    );
}