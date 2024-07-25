import {AppUser} from "../types/AppUser.ts";
import {useNavigate} from "react-router-dom";
import {ReactNode, useEffect} from "react";

type ProtectedRouteProps = {
    appUser : AppUser,
    children: ReactNode,
}
export default function ProtectedRoute(props: Readonly<ProtectedRouteProps>) {

    const isAllowed : boolean = props.appUser.id != "";
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAllowed){
            navigate("/");
        }

    }, [isAllowed, navigate]);

    return (
        <>
            {props.children}
        </>
    );
}
