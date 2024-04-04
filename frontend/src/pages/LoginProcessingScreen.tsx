import {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";

type LoginProcessingScreen = {
    getUser : (id : string | undefined) => void
}

export default function LoginProcessingScreen(props: Readonly<LoginProcessingScreen>) {

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        props.getUser(params.id)
        navigate("/home")
    }, []);

    return (
        <h1>Login...</h1>
    );
}