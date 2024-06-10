import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

type LoginProcessingScreen = {
    getMe : () => void
}


export default function LoginProcessingScreen(props: Readonly<LoginProcessingScreen>) {

    const navigate = useNavigate()

    useEffect(() => {
        props.getMe()
        navigate("/home")
    }, [navigate, props]);

    return (
        <h1>Login...</h1>
    );
}